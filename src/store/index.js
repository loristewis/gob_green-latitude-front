import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      steps: [
        'prescription',
        'destination',
        'transportation',
        'accommodation',
        'incidents',
        'activities',
        'postcard',
      ],
      progressionIndex: 1,
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
    activitiesCount: (state) => state.trip.activities.length,
  },
  actions: {
    incrementProgressionIndex() {
      this.progressionIndex++
    },
  },
})
