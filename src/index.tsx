import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import Store from './store'
import Routes from './routes'

const store = new Store()

ReactDOM.render(
  <Provider store={ store }>
    <Routes/>
  </Provider>,
  document.getElementById('root')
)