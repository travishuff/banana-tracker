import React from 'react'
import { Link } from '@reach/router'

import './css/nav-bar.css'
import banana from '../images/banana-logo.png'

import { Menu } from 'semantic-ui-react'

class NavBar extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item as={Link} to="/">
          <img src={banana} className="logo" alt="Banana Tracker logo" />
          Banana Tracker
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/analytics"
          name="analytics"
          active={activeItem === 'analytics'}
          onClick={this.handleItemClick}
        >
          Analytics
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/buy"
          name="buy"
          active={activeItem === 'buy'}
          onClick={this.handleItemClick}
        >
          Buy
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/sell"
          name="sell"
          active={activeItem === 'sell'}
          onClick={this.handleItemClick}
        >
          Sell
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar
