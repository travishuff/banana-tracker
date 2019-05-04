import React from 'react'
import { Link } from '@reach/router'

import './css/nav-bar.css'
import banana from '../images/banana-logo.png'

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'shards-react'

class NavBar extends React.Component {
  state = {
    dropdownOpen: false,
    collapseOpen: false,
  }

  toggleNavbar = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    })
  }

  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand tag={Link} to="/">
          <img src={banana} className="logo" alt="Banana Tracker logo" />
          Banana Tracker
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/analytics">
                Analytics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/buy">
                Buy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/sell">
                Sell
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavBar
