import React, { useState } from 'react'
import { Link } from '@reach/router'

import './css/nav-bar.css'
import banana from '../images/banana-logo.png'

import { Menu } from 'semantic-ui-react'

const NavBar = () => {
  const [activeItem, updateActiveItem] = useState('')

  const handleItemClick = (e, { name }) => updateActiveItem(name)

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
        onClick={handleItemClick}
      >
        Analytics
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/buy"
        name="buy"
        active={activeItem === 'buy'}
        onClick={handleItemClick}
      >
        Buy
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/sell"
        name="sell"
        active={activeItem === 'sell'}
        onClick={handleItemClick}
      >
        Sell
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
