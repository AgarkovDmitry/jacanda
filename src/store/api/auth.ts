import axios from 'axios'

export default class AuthApi {
  login(login: string, password: string) {
    return axios.post('/api/login', { login, password })
  }

  signup(login: string, password: string, fullname: string) {
    return axios.post('/api/signup', { login, password, fullname })
  }
}