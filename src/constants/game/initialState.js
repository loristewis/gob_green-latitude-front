import { scoreConstants } from '@/constants'

import Click from '@/assets/audio/clic.mp3'
import Defeat from '@/assets/audio/defaite.mp3'
import Incident from '@/assets/audio/incident.mp3'
import Modal from '@/assets/audio/modal.mp3'
import Music from '@/assets/audio/musique.mp3'
import Scores from '@/assets/audio/scores.mp3'
import Splash from '@/assets/audio/splash.mp3'
import Swipe from '@/assets/audio/swipe.mp3'
import Transition from '@/assets/audio/transition.mp3'
import Validation from '@/assets/audio/validation.mp3'
import Victory from '@/assets/audio/victoire.mp3'

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
    'postcard',
  ],
  soundon: true,
  modal: null,
  audio: {
    click: new Audio(Click),
    defeat: new Audio(Defeat),
    incident: new Audio(Incident),
    modal: new Audio(Modal),
    music: new Audio(Music),
    scores: new Audio(Scores),
    splash: new Audio(Splash),
    swipe: new Audio(Swipe),
    transition: new Audio(Transition),
    validation: new Audio(Validation),
    victory: new Audio(Victory),
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
