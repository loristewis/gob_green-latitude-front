import { defineStore } from 'pinia'

import { getRandomFromArray, cleanString } from '@/helpers'
import { scoreConstants, initialState, splashScreens, names } from '@/constants'

export const useStore = defineStore('main', {
  state: () => {
    return { ...initialState }
  },
  getters: {
    currentStep: (state) => state.steps[state.progressionIndex],
    currentComponent: (state) => {
      if (state.progressionIndex > state.steps.length - 1) {
        state.progressionIndex = state.steps.length - 1
      }
      return state.steps[state.progressionIndex].split('-')[0] + '-container'
    },
    currentAnimation: (state) =>
      state.steps[state.progressionIndex].split('-')[1],
    activitiesCount: (state) => state.trip.activities.length,
    activeThought: (state) => {
      if (state.currentStep === 'activities') {
        for (const activity of state.trip.activities) {
          if (activity.createdAt === state.selected.createdAt) {
            return null
          }
        }
      }
      if (state.currentStep === 'postcard') {
        return null
      }
      if (state.currentComponent === 'animation-container') {
        return null
      }
      return state.selected ? state.selected.thoughts : null
    },
  },
  actions: {
    toggleSound() {
      console.log('toggle sound')
      this.soundon = !this.soundon
      console.log('sound: ', this.soundon)
    },
    incrementProgressionIndex() {
      this.progressionIndex++
    },
    displaySplashScreen() {
      if (this.splashTimeout) clearTimeout(this.splashTimeout)
      this.splash = true
      if (this.soundon) {
        setTimeout(() => {
          this.audio.splash.play()
        }, 800)
      }
      this.splashTimeout = setTimeout(() => {
        this.splash = false
      }, 3000)
    },
    exitSplashScreen() {
      if (this.splashTimeout && this.splash) {
        this.splash = false
        clearTimeout(this.splashTimeout)
      }
    },
    moveToStep(step) {
      this.progressionIndex = this.steps.indexOf(step)
    },
    moveToNextStep() {
      this.incrementProgressionIndex()
      if (splashScreens[this.currentStep]) {
        this.displaySplashScreen()
      }
    },
    finishStep({ next: next } = { next: true }) {
      console.log('finishStep')
      this.calculateScore()
      if (this.soundon) this.audio.scores.play()

      if (!this.defeat) {
        if (next) {
          setTimeout(() => this.moveToNextStep(), 2500)
        }
      } else {
        let delay = 1600
        if (
          this.currentStep === 'incident' ||
          this.currentStep === 'activities'
        ) {
          delay = 3000
        }
        setTimeout(() => {
          this.modal = 'defeat'
          if (this.soundon) {
            this.audio.modal.play()
          }
        }, delay)
      }
    },
    resetState() {
      this.splash = false
      this.progressionIndex = 0
      this.selected = null
      this.thought = ''
      this.incidents = []
      this.defeat = null
      this.modal = null
      this.resetScore()
      this.resetTrip()
    },
    resetScore() {
      this.score.wellness = scoreConstants.wellness.initial
      this.score.budget = scoreConstants.budget.initial
      this.score.pollution = scoreConstants.pollution.initial
    },
    resetTrip() {
      this.trip.wish = null
      this.trip.destination = null
      this.trip.transportation = null
      this.trip.accommodation = null
      this.trip.incident.situation = null
      this.trip.incident.outcome = null
      this.trip.activities = []
    },
    collectPotentialIncidents(element) {
      console.log(element)
      const incidents = element.incidents.data
      for (const incident of incidents) {
        if (!this.incidents.includes(incident)) {
          this.incidents.push(incident)
          console.log('nouvelle péripétie!')
          console.log(this.incidents)
        }
      }
    },
    checkDefeat() {
      // if (this.dev) return

      let defeats = []

      if (this.score.wellness <= scoreConstants.wellness.limit) {
        defeats.push({
          type: 'wellness',
          score: Math.abs(scoreConstants.wellness.limit - this.score.wellness),
        })
      }

      if (this.score.budget <= scoreConstants.budget.limit) {
        if (this.activitiesCount != 3) {
          defeats.push({
            type: 'budget',
            score: Math.abs(scoreConstants.budget.limit - this.score.budget),
          })
        }
      }

      if (this.score.pollution >= scoreConstants.pollution.limit) {
        defeats.push({
          type: 'pollution',
          score: Math.abs(
            scoreConstants.pollution.limit - this.score.pollution
          ),
        })
      }

      if (defeats.length > 0) {
        defeats.sort((a, b) => {
          return b.score - a.score
        })
        console.log(defeats)
        this.defeat = defeats[0].type
      }
    },
    cleanDefeat() {
      this.defeat = null
    },
    calculateScore() {
      this.resetScore()

      console.log('calculateScore')

      if (this.trip.transportation) {
        this.calculateTransportation()
      }
      if (this.trip.accommodation) {
        this.calculateAccommodation()
      }
      if (this.trip.incident.outcome) {
        this.calculateIncident()
      }
      if (this.activitiesCount > 0) {
        this.calculateActivities()
      }

      this.checkDefeat()
    },
    calculateTransportation() {
      this.score.wellness += this.trip.transportation.wellness
      this.score.pollution +=
        this.trip.destination.category === 'loin'
          ? this.trip.transportation.pollution * 2
          : this.trip.transportation.pollution
      this.score.budget -= this.trip.transportation.budget
    },
    calculateAccommodation() {
      this.score.wellness += this.trip.accommodation.wellness
      this.score.pollution += this.trip.accommodation.pollution
      this.score.budget -=
        this.trip.destination.category === 'cher'
          ? this.trip.accommodation.budget * 2
          : this.trip.accommodation.budget
    },
    calculateIncident() {
      this.score.wellness += this.trip.incident.outcome.wellness
      this.score.pollution += this.trip.incident.outcome.pollution
      this.score.budget -= this.trip.incident.outcome.budget
    },
    calculateActivities() {
      console.log('calculateActivities')
      console.log(this.trip.activities)

      for (const activity of this.trip.activities) {
        console.log(activity)

        const wishes = activity.wishes.data.map((el) => el.attributes.title)

        let wellness = activity.wellness
        if (!wellness) {
          wellness = 0
        }

        if (this.trip.destination.category === 'bof') {
          if (wellness < 0) {
            wellness = wellness * 2
          } else {
            wellness = wellness / 2
          }
        }
        if (!wishes.includes(this.trip.wish)) {
          if (this.trip.destination.category != 'bof') {
            if (wellness < 0) {
              wellness = wellness * 2
            } else {
              wellness = wellness / 2
            }
          }
        } else {
          if (wellness < 0) {
            wellness = wellness / 2
          } else {
            wellness = wellness * 2
          }
        }

        this.score.wellness += wellness
        this.score.pollution += activity.pollution
        this.score.budget -= activity.budget
      }
    },
    wording(text) {
      if (!text) return ''
      const match = text.match('::(.*)::')
      let newText = text
      if (match) {
        console.log('match!')
        let replacement = ''
        if (match[1] === 'name') {
          replacement = this.trip.destination.country
            ? getRandomFromArray(names[this.trip.destination.country])
            : 'name'
        } else if (match[1] === 'destination') {
          replacement = this.trip[match[1]].title
        } else {
          replacement = '?'
        }
        newText = newText.replace(match[0], replacement)
      }
      return cleanString(newText)
    },
  },
})
