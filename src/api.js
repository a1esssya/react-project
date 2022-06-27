import axios from 'axios'

const api = axios.create({
  baseURL: 'https://tms-js-pro-back-end.herokuapp.com/api/',
})

api.setup = key => {
  api.defaults.headers.Authorization = `Token ${key}`
  api.defaults.headers.Accept = "application/json"
  api.defaults.headers['Content-Type'] = "application/json"
}

export default api
