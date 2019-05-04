import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'
import './css/app.css'

import Analytics from './Analytics'
import Buy from './Buy'
import Home from './Home'
import NavBar from './NavBar'
import Sell from './Sell'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Home path="/" />
          <Analytics path="/analytics" />
          <Buy path="/buy" />
          <Sell path="/sell" />
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
