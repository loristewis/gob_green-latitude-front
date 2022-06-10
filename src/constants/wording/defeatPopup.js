import PollutionBad from '@/assets/gauges/pollution/bad.svg'
import WellnessBad from '@/assets/gauges/wellness/bad.svg'
import EmptyCoin from '@/assets/coins/empty-coin.svg'

export const defeatPopup = {
  wellness: {
    type: 'wellness',
    title: 'Burn out',
    description: "Ouhloulou t'as explosé la jauge bien-être, c'est perdu",
    image: WellnessBad,
  },
  budget: {
    type: 'budget',
    title: 'Sans le sou',
    description: "Ouhloulou t'as explosé la jauge budget, c'est perdu",
    image: EmptyCoin,
  },
  pollution: {
    type: 'pollution',
    title: 'Catastrophe climatique',
    description: "Ouhloulou t'as explosé la jauge pollution, c'est perdu",
    image: PollutionBad,
  },
}
