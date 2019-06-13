import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Router } from '@reach/router'
import axios from 'axios'

import 'semantic-ui-css/semantic.min.css'
import './css/app.css'
import store from './redux/store'
import { initializeStore } from './redux/actionCreators'

import NavBar from './NavBar'

const loading = () => <h2>Loading split code ...</h2>
const LoadableHome = Loadable({
  loader: () => import('./Home'),
  loading,
})
const LoadableAnalytics = Loadable({
  loader: () => import('./Analytics'),
  loading,
})
const LoadableBuy = Loadable({
  loader: () => import('./Buy'),
  loading,
})
const LoadableSell = Loadable({
  loader: () => import('./Sell'),
  loading,
})
const LoadableFullList = Loadable({
  loader: () => import('./FullList'),
  loading,
})
const LoadableGroupList = Loadable({
  loader: () => import('./GroupList'),
  loading,
})

const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Router>
        <LoadableHome path="/" />
        <LoadableAnalytics path="/analytics" />
        <LoadableBuy path="/buy" />
        <LoadableSell path="/sell" />
        <LoadableGroupList path="/groups" />
        <LoadableFullList path="/list" />
      </Router>
    </Provider>
  )
}

// Update the store with saved database state.
axios
  .get('http://localhost:8080/api/bananas')
  .then(response => {
    store.dispatch(initializeStore(response.data))
  })
  .catch(console.error)

render(<App />, document.getElementById('root'))
