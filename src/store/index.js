import { defineStore } from 'pinia'

import { getRandomScore, getRandomFromArray } from '../helpers'
import { scoreConstants, names } from './../constants'

export const useStore = defineStore('main', {
  state: () => {
    return {
      steps: [
        'animation-intro',
        'prescription',
        'destination',
        'transportation',
        'accommodation',
        'animation-travel',
        'incident',
        'activities',
        'animation-end',
        'postcard',
      ],
      splash: false,
      progressionIndex: 0,
      selected: null,
      score: {
        wellness: scoreConstants.wellness.initial,
        budget: scoreConstants.budget.initial,
        pollution: scoreConstants.pollution.initial,
      },
      incidents: [],
      trip: {
        wish: null,
        destination: null,
        transportation: null,
        accommodation: null,
        incident: {
          event: null,
          outcome: null,
        },
        activities: [],
      },
    }
  },
  getters: {
    currentStep: (state) => state.steps[state.progressionIndex],
    currentComponent: (state) =>
      state.steps[state.progressionIndex].split('-')[0] + '-container',
    activitiesCount: (state) => state.trip.activities.length,
    activeThought: (state) => (state.selected ? state.selected.thoughts : null),
  },
  actions: {
    incrementProgressionIndex() {
      this.progressionIndex++
    },
    displaySplashScreen() {
      this.splash = true
      setTimeout(() => (this.splash = false), 1000)
    },
    moveToNextStep() {
      this.incrementProgressionIndex()
      this.displaySplashScreen()
    },
    finishStep() {
      this.calculateScore()
      setTimeout(() => this.moveToNextStep(), 1000)
    },
    collectPotentialIncidents(element) {
      const incidents = element.events.data
      for (const incident of incidents) {
        if (!this.incidents.includes(incident)) {
          this.incidents.push(incident)
          console.log('nouvelle péripétie!')
          console.log(this.incidents)
        }
      }
    },
    calculateScore() {
      this.score.wellness = scoreConstants.wellness.initial
      this.score.budget = scoreConstants.budget.initial
      this.score.pollution = scoreConstants.pollution.initial

      if (this.trip.transportation) {
        this.calculateTransportation()
      }
      if (this.trip.accommodation) {
        this.calculateAccomodation()
      }
      if (this.trip.incident.outcome) {
        console.log('on ajoute la péripétie au score!')
        this.calculateIncident()
      }
      if (this.activitiesCount === 3) {
        this.calculateActivities()
      }
      console.log('nouveau score!')
      console.log(this.score)
    },
    calculateTransportation() {
      this.score.wellness += this.trip.transportation.wellness
      this.score.pollution +=
        this.trip.destination.category === 'loin'
          ? this.trip.transportation.pollution * 2
          : this.trip.transportation.pollution
      this.score.budget -= this.trip.transportation.budget
    },
    calculateAccomodation() {
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
      for (const activity of this.trip.activities) {
        const wishes = activity.wishes.data.map((el) => el.attributes.title)

        let wellness = activity.wellness
        if (!wellness) {
          wellness = getRandomScore()
        }
        if (this.trip.destination.category === 'bof') {
          wellness = wellness / 2
        }
        if (!wishes.includes(this.trip.wish)) {
          wellness = wellness / 2
        } else {
          wellness = wellness * 2
        }

        this.score.wellness += this.divider ? wellness / 2 : wellness
        this.score.pollution += this.divider
          ? activity.pollution / 2
          : activity.pollution
        this.score.budget -= this.divider
          ? activity.budget / 2
          : activity.budget
      }
    },
    wording(text) {
      const match = text.match('::(.*)::')
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
        text = text.replace(match[0], replacement)
      }
      return text
    },
  },
})
