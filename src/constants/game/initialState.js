import { scoreConstants } from '@/constants'

import Click from '@/assets/audio/clic.mp3'
import Defeat from '@/assets/audio/defaite.mp3'
import Incident from '@/assets/audio/incident.mp3'
import Music from '@/assets/audio/musique.mp3'
import Splash from '@/assets/audio/splash.mp3'
import Swish from '@/assets/audio/swish.mp3'
import Validation from '@/assets/audio/validation.mp3'
import Victory from '@/assets/audio/victoire.mp3'
import Whoosh from '@/assets/audio/whoosh.mp3'

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
  soundon: false,
  modal: null,
  audio: {
    click: new Audio(Click),
    defeat: new Audio(Defeat),
    incident: new Audio(Incident),
    music: new Audio(Music),
    splash: new Audio(Splash),
    swish: new Audio(Swish),
    validation: new Audio(Validation),
    victory: new Audio(Victory),
    whoosh: new Audio(Whoosh),
  },
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
