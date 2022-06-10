import axios from 'axios'
import qs from 'qs'

import { colors } from '@/constants'

export const getFromApi = (endpoint, params) => {
  if (!params.fields) params.fields = '*'
  if (!params.populate) params.populate = '*'

  const baseUrl = import.meta.env.VITE_API_URL
  const query = qs.stringify(params)
  const requestUrl = `${baseUrl}${endpoint}?${query}`

  return axios.get(requestUrl)
}

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

export const cleanString = (string) => {
  let result = string

  result = string.replace('de le', 'du')
  result = result.replace('de Le', 'du')

  result = result.replace('à le', 'au')
  result = result.replace('à Le', 'au')

  result = result.replace(/de ([a, e, i, o, u, y])/, "d'$1")

  return result
}

export const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomElementsFromArray = (array, number) => {
  let pool = [...array]
  if (number > pool.length) {
    return shuffleArray(pool)
  } else {
    let selection = []
    for (let i = 0; i < number; i++) {
      const randomIndex = Math.floor(Math.random() * array.length)
      selection.push(pool[randomIndex])
      pool.splice(randomIndex, 1)
    }
    return selection
  }
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

export const getRandomScore = () => {
  return Math.random() < 0.5 ? -1 : 1
}

export const getImage = (data, key = 'image') => {
  let image = 'https://picsum.photos/200/200'
  if (data.attributes && data.attributes[key] && data.attributes[key].data)
    image = data.attributes[key].data.attributes.url
  if (data[key] && data[key].data) image = data[key].data.attributes.url
  return image
}

export const getRandomColor = (category = 'all') => {
  return 'var(--color-' + getRandomFromArray(colors[category]) + ')'
}
