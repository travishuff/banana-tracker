import React from 'react'
import { render } from 'react-dom'

import './css/app.css'

class App extends React.Component {
  render() {
    return <div>Hello Tokyo!</div>
  }
}

render(<App />, document.getElementById('root'))
