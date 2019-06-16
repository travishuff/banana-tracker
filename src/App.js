import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable'
import { Router } from '@reach/router'

import 'semantic-ui-css/semantic.min.css'
import './css/app.css'

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

const App = () => (
  <div>
    <NavBar />
    <Router>
      <LoadableHome path="/" />
      <LoadableAnalytics path="/analytics" />
      <LoadableBuy path="/buy" />
      <LoadableSell path="/sell" />
      <LoadableGroupList path="/groups" />
      <LoadableFullList path="/list" />
    </Router>
  </div>
)

render(<App />, document.getElementById('root'))
