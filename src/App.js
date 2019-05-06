import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import Loadable from 'react-loadable'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'
import './css/app.css'

import NavBar from './NavBar'

const loading = () => <h1>Loading split code ...</h1>
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

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <LoadableHome path="/" />
          <LoadableAnalytics path="/analytics" />
          <LoadableBuy path="/buy" />
          <LoadableSell path="/sell" />
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
