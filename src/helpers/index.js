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
