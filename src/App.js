import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'

import './css/app.css'

import Analytics from './Analytics'
import Buy from './Buy'
import Home from './Home'
import Sell from './Sell'

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/sell">Sell</Link>
          <Router>
            <Home path="/" />
            <Analytics path="/analytics" />
            <Buy path="/buy" />
            <Sell path="/sell" />
          </Router>
        </header>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
