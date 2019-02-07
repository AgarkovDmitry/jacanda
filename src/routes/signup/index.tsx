import * as React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const styles = require('./style.css')

@withRouter
@inject('store')
@observer
export default class App extends React.Component<{ history?: any }>{
  root: IRootStore

  @observable login: string = ''
  @observable password: string = ''
  @observable passwordConfirmation: string = ''
  @observable fullname: string = ''

  constructor(props) {
    super(props)
    this.root = props.store
  }

  @action handleLoginInput = (e) => this.login = e.target.value
  @action handlePasswordInput = (e) => this.password = e.target.value
  @action handlePasswordConfirmationInput = (e) => this.passwordConfirmation = e.target.value
  @action handleFullnameInput = (e) => this.fullname = e.target.value

  @action submit = async () => {
    if (this.password !== this.passwordConfirmation) {
      return
    }

    const res = await this.root.signup(this.login, this.password, this.fullname)

    if (res.data.user.fullname) {
      this.props.history.push('/')
    } else {
      alert(res.data)
    }
  }

  render() {
    return (
      <div className={ styles.root }>
        <div className={ styles.title }>Signup form </div>
        
        <div className={ styles.field }>
          Enter login <input type='text' value={ this.login } onChange={ this.handleLoginInput } />
        </div>
        <div className={ styles.field }>
          Enter password <input type='password' value={ this.password } onChange={ this.handlePasswordInput } />
        </div>
        <div className={ styles.field }>
          Confirm password <input type='password' value={ this.passwordConfirmation } onChange={ this.handlePasswordConfirmationInput } />
        </div>
        <div className={ styles.field }>
          Enter fullname <input type='text' value={ this.fullname } onChange={ this.handleFullnameInput } />
        </div>

        <button onClick={ this.submit }> Signup </button>
      </div>
    )
  }
}