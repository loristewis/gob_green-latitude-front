import { defineStore } from 'pinia'

import { getRandomScore, getRandomFromArray } from '../helpers'
import { names } from './../constants/names.js'

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
        'incidents',
        'activities',
        'animation-end',
        'postcard',
      ],
      splash: false,
      progressionIndex: 0,
      score: {
        wellness: 2,
        budget: 10,
        pollution: 0,
      },
      trip: {
        wish: null,
        destination: null,
        transportation: null,
        accommodation: null,
        incidents: [],
        activities: [],
      },
    }
  },
  getters: {
    currentStep: (state) => state.steps[state.progressionIndex],
    currentComponent: (state) =>
      state.steps[state.progressionIndex].split('-')[0] + '-container',
    activitiesCount: (state) => state.trip.activities.length,
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
    calculateScore() {
      this.score.wellness = 2
      this.score.budget = 10
      this.score.pollution = 0

      if (this.trip.transportation) {
        this.calculateTransportation()
      }
      if (this.trip.accommodation) {
        this.calculateAccomodation()
      }
      if (this.activitiesCount === 3) {
        this.calculateActivities()
      }
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
