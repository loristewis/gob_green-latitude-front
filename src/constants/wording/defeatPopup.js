import PollutionBad from '@/assets/gauges/pollution/bad.svg'
import WellnessBad from '@/assets/gauges/wellness/bad.svg'
import EmptyCoin from '@/assets/coins/empty-coin.svg'

export const defeatPopup = {
  wellness: {
    type: 'wellness',
    title: 'Burn out',
    description:
      'Il semblerait que votre voyage n’ait pas eu l’effet escompté... Votre patron sera ravi de vous revoir (vous et vos cernes) lundi matin...',
    image: WellnessBad,
  },
  budget: {
    type: 'budget',
    title: 'Sans le sou',
    description:
      'En y réfléchissant, ces vacances onéreuses valaient-elle vraiment ce porte-monnaie si vide ? Au moins vous voyagerez plus léger au retour…',
    image: EmptyCoin,
  },
  pollution: {
    type: 'pollution',
    title: 'Crise de conscience',
    description:
      'Votre conscience écologique vous rattrape… Des décisions un peu plus raisonnables vous auraient peut-être permis de profiter davantage de ces vacances…',
    image: PollutionBad,
  },
}
