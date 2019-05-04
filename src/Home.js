import React from 'react'

import './css/home.css'
import banana from '../images/banana-logo.png'

class Home extends React.Component {
  render() {
    return (
      <div className="hero-container">
        <div className="app-name">Banana Tracker</div>
        <img src={banana} alt="Banana Tracker logo" />
      </div>
    )
  }
}

export default Home
