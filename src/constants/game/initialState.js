import { scoreConstants } from '@/constants'

export const initialState = {
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
  skipIntro: false,
  splash: false,
  dev: true,
  progressionIndex: 0,
  selected: null,
  thought: '',
  score: {
    wellness: scoreConstants.wellness.initial,
    budget: scoreConstants.budget.initial,
    pollution: scoreConstants.pollution.initial,
  },
  incidents: [],
  defeat: null,
  trip: {
    wish: null,
    destination: null,
    transportation: null,
    accommodation: null,
    incident: {
      situation: null,
      outcome: null,
    },
    activities: [],
  },
}
