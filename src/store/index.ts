import { action, observable } from 'mobx'
import * as cookies from 'js-cookie'

import Api from './api/auth'

const cookieToken = 'jacanda-auth'

export default class MainStore {
  api = new Api()
  @observable fullname: string = ''

  constructor() {
    const token = cookies.get(cookieToken)

    if (token) {
      //parse jwt token in order to get user out of it.
      //taking second part of token and convert it to JSON object
      const buffer = new Buffer(token.split('.')[1], 'base64').toString('binary')
  
      const user = JSON.parse(buffer).user

      this.fullname = user.fullname
    }
  }

  @action async signup(login: string, password: string, fullname: string) {
    const res = await this.api.signup(login, password, fullname)

    if (res.data.user) {
      this.fullname = res.data.user.fullname
      cookies.set(cookieToken, res.data.token)
    } else {
      console.log(res.data)
    }

    return res
  }

  @action async login(login: string, password: string) {
    const res = await this.api.login(login, password)

    if (res.data.user) {
      this.fullname = res.data.user.fullname
      cookies.set(cookieToken, res.data.token)
    } else {
      console.log(res.data)
    }

    return res
  }

  @action logout() {
    this.fullname = ''
    cookies.remove(cookieToken)
  }
}

declare global {
  class IRootStore extends MainStore {}
}