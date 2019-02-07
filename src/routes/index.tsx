import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Login from './login'
import Signup from './signup'

@inject('store')
@observer
export default class App extends React.Component{
  root: IRootStore

  constructor(props) {
    super(props)
    this.root = props.store
  }

  logout = () => {
    this.root.logout()
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <div> { this.root.fullname } </div>
              {
                this.root.fullname && <Link to='/profile'> profile </Link>
              }
              {
                this.root.fullname && <button onClick={ this.logout }> logout </button>
              }
              {
                !this.root.fullname && <Link to='/login'> login </Link>
              }
              {
                !this.root.fullname && <Link to='/signup'> signup </Link>
              }              
            </div>
            <Switch>
              <Route path='/login' component={ Login } />
              <Route path='/signup' component={ Signup } />
              <Route path='/' component={ () => <div> Home route. Your name { this.root.fullname } </div> }/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}