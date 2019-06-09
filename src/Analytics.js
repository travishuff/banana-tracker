import React from 'react'
import axios from 'axios'
import {
  differenceInCalendarDays,
  format,
  lastDayOfMonth,
  startOfMonth,
} from 'date-fns'
import get from 'lodash/get'
import { Link } from '@reach/router'

import './css/analytics.css'

import { Button, Container, Form, Table } from 'semantic-ui-react'
import Dates from './Dates'
import Margins from './Margins'

class Analytics extends React.Component {
  state = {
    data: [],
    buyPrice: 0.2,
    sellPrice: 0.35,
    start: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
    end: format(lastDayOfMonth(new Date()), 'YYYY-MM-DD'),
  }

  bananasByTime = () => {
    return this.state.data.filter(banana => {
      const buyDate = get(banana, 'buyDate', '')
      const sellDate = get(banana, 'sellDate', '')

      return (
        Date.parse(buyDate) >= Date.parse(this.state.start) &&
        Date.parse(buyDate) <= Date.parse(this.state.end) &&
        (sellDate === null ||
          (Date.parse(sellDate) >= Date.parse(this.state.start) &&
            Date.parse(sellDate) <= Date.parse(this.state.end)))
      )
    })
  }
  expiredBananas = () => {
    return this.bananasByTime().filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) >= 11
    })
  }
  soldBananas = () => {
    return this.bananasByTime().filter(
      banana => get(banana, 'sellDate') !== null
    )
  }
  unexpiredBananas = () => {
    return this.bananasByTime().filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) < 11
    })
  }
  unsoldBananas = () => {
    return this.bananasByTime().filter(
      banana => get(banana, 'sellDate') === null
    )
  }

  // GAAP Measures: computed properties based on current state.
  soldBananasValue = () => {
    return (this.soldBananas().length * this.state.sellPrice).toFixed(2)
  }
  totalBananasCost = () => {
    return (this.bananasByTime().length * this.state.buyPrice).toFixed(2)
  }
  totalProfit = () => {
    return (this.soldBananasValue() - this.totalBananasCost()).toFixed(2)
  }

  // Non-GAAP Measures: computed properties based on current state.
  unsoldUnexpiredBananas = () => {
    return this.unexpiredBananas().filter(banana => banana.sellDate === null)
  }
  unsoldUnexpiredBananasValue = () => {
    // prettier-ignore
    return (this.unsoldUnexpiredBananas().length * this.state.sellPrice).toFixed(2)
  }
  unsoldExpiredBananas = () => {
    return this.expiredBananas().filter(banana => banana.sellDate === null)
  }
  unsoldExpiredBananasCost = () => {
    return (this.unsoldExpiredBananas().length * this.state.buyPrice).toFixed(2)
  }
  allOtherBananasCost = () => {
    // prettier-ignore
    return (this.totalBananasCost() - this.unsoldExpiredBananasCost()).toFixed(2)
  }
  potentialProfit = () => {
    return (
      Number(this.soldBananasValue()) +
      Number(this.unsoldUnexpiredBananasValue()) -
      Number(this.totalBananasCost())
    ).toFixed(2)
  }

  handlePriceChange = event => {
    this.setState({
      [event.target.name]: Number(event.target.value),
    })

    localStorage.setItem(event.target.name, event.target.value)
  }

  handleDateChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })

    localStorage.setItem(event.target.name, event.target.value)
  }

  resetFields = () => {
    this.setState({
      buyPrice: 0.2,
      sellPrice: 0.35,
      start: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
      end: format(lastDayOfMonth(new Date()), 'YYYY-MM-DD'),
    })

    localStorage.clear()
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)

        try {
          value = JSON.parse(value)
          this.setState({ [key]: value })
        } catch (e) {
          this.setState({ [key]: value })
        }
      }
    }
  }

  async componentDidMount() {
    const response = await axios
      .get('http://localhost:8080/api/bananas')
      .catch(console.error)
    this.setState(
      {
        data: response?.data,
      },
      this.hydrateStateWithLocalStorage()
    )
  }

  render() {
    const { buyPrice, sellPrice, start, end } = this.state

    return (
      <Container fluid={true} className="main-container">
        <h1>Analytics</h1>

        <Dates
          start={start}
          end={end}
          handleDateChange={this.handleDateChange}
        />

        <Table color="blue" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">Non-GAAP Measures</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Bananas sold</Table.Cell>
              <Table.Cell>{this.soldBananas().length}</Table.Cell>
              <Table.Cell>${sellPrice.toFixed(2)}</Table.Cell>
              <Table.Cell positive>${this.soldBananasValue()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Unsold unexpired bananas</Table.Cell>
              <Table.Cell>{this.unsoldUnexpiredBananas().length}</Table.Cell>
              <Table.Cell>${sellPrice.toFixed(2)}</Table.Cell>
              <Table.Cell positive>
                ${this.unsoldUnexpiredBananasValue()}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Unsold expired bananas</Table.Cell>
              <Table.Cell>{this.unsoldExpiredBananas().length}</Table.Cell>
              <Table.Cell>${buyPrice.toFixed(2)}</Table.Cell>
              <Table.Cell negative>
                ${this.unsoldExpiredBananasCost()}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>All other purchased bananas</Table.Cell>
              <Table.Cell>
                {this.bananasByTime().length -
                  this.unsoldExpiredBananas().length}
              </Table.Cell>
              <Table.Cell>${buyPrice.toFixed(2)}</Table.Cell>
              <Table.Cell negative>${this.allOtherBananasCost()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3" textAlign="right">
                Potential Profit/Loss
              </Table.Cell>
              <Table.Cell
                positive={this.potentialProfit() > 0 ? true : false}
                negative={this.potentialProfit() < 0 ? true : false}
              >
                ${Math.abs(this.potentialProfit()).toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table color="green" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">GAAP Measures</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Bananas sold</Table.Cell>
              <Table.Cell>{this.soldBananas().length}</Table.Cell>
              <Table.Cell>${sellPrice.toFixed(2)}</Table.Cell>
              <Table.Cell positive>${this.soldBananasValue()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Bananas purchased</Table.Cell>
              <Table.Cell>{this.bananasByTime().length}</Table.Cell>
              <Table.Cell>${buyPrice.toFixed(2)}</Table.Cell>
              <Table.Cell negative>${this.totalBananasCost()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3" textAlign="right">
                Profit/Loss
              </Table.Cell>
              <Table.Cell
                positive={this.totalProfit() > 0 ? true : false}
                negative={this.totalProfit() < 0 ? true : false}
              >
                ${Math.abs(this.totalProfit()).toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button color="blue">
          <Link to="/groups" className="button-text">
            List of Banana Groups
          </Link>
        </Button>
        <Button color="blue">
          <Link to="/list" className="button-text">
            Full List of Bananas
          </Link>
        </Button>

        <Margins
          buyPrice={buyPrice}
          sellPrice={sellPrice}
          handlePriceChange={this.handlePriceChange}
        />

        <Form.Button
          color="red"
          onClick={this.resetFields}
          content="Reset All Form Fields"
        />
      </Container>
    )
  }
}

export default Analytics
