import PollutionGood from '@/assets/gauges/pollution/good.svg'
import PollutionMid from '@/assets/gauges/pollution/mid.svg'
import PollutionBad from '@/assets/gauges/pollution/bad.svg'

import WellnessGood from '@/assets/gauges/wellness/good.svg'
import WellnessMid from '@/assets/gauges/wellness/mid.svg'
import WellnessBad from '@/assets/gauges/wellness/bad.svg'

const red = 'var(--color-red)'
const orange = 'var(--color-orange)'
const green = 'var(--color-green-light)'

export const gauges = {
  pollution: [
    {
      icon: PollutionGood,
      color: green,
    },
    {
      icon: PollutionMid,
      color: orange,
    },
    {
      icon: PollutionBad,
      color: red,
    },
  ],
  wellness: [
    {
      icon: WellnessBad,
      color: red,
    },
    {
      icon: WellnessMid,
      color: orange,
    },
    {
      icon: WellnessGood,
      color: green,
    },
  ],
}
