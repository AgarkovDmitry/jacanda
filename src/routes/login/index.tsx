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

  constructor(props) {
    super(props)
    this.root = props.store
  }

  @action handleLoginInput = (e) => this.login = e.target.value
  @action handlePasswordInput = (e) => this.password = e.target.value

  @action submit = async () => {
    const res = await this.root.login(this.login, this.password)

    if (res.data.user) {
      this.props.history.push('/')
    } else {
      alert(res.data)
    }
  }

  render() {
    return (
      <div className={ styles.root }>
        <div className={ styles.title }>Login form </div>
        
        <div className={ styles.field }>
          Enter login:
          <input type='text' value={ this.login } onChange={ this.handleLoginInput } />
        </div>
        <div className={ styles.field }>
          Enter password:
          <input type='password' value={ this.password } onChange={ this.handlePasswordInput } />
        </div>
        <button onClick={ this.submit }> Login </button>
      </div>
    )
  }
}