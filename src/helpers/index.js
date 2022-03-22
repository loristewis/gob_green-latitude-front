import axios from 'axios';

export const getFromApi = (url) => {
	return axios.get(url,{
		baseURL: import.meta.env.VITE_API_URL
	})
}
