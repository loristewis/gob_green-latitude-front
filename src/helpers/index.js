import axios from 'axios'
import qs from 'qs'

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

export const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

export const getRandomScore = () => {
  return Math.random() < 0.5 ? -1 : 1
}

export const getImage = (data) => {
  let image = 'https://picsum.photos/200/200'
  if (data.attributes && data.attributes.image && data.attributes.image.data)
    image = data.attributes.image.data.attributes.url
  if (data.image && data.image.data) image = data.image.data.attributes.url
  return image
}
