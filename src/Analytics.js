import React from 'react'
import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'
import get from 'lodash/get'
import { Link } from '@reach/router'

import './css/analytics.css'

import { Button, Container, Table } from 'semantic-ui-react'
import Margins from './Margins'

class Analytics extends React.Component {
  state = {
    buyPrice: 0.2,
    sellPrice: 0.35,
    bananas: [],
    expiredBananas: [],
    soldBananas: [],
    unexpiredBananas: [],
    unsoldBananas: [],
  }

  async componentDidMount() {
    const response = await axios
      .get('http://localhost:8080/api/bananas')
      .catch(console.error)
    this.parseBananas(response.data)
  }

  parseBananas = bananas => {
    const expiredBananas = bananas.filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) >= 11
    })
    const unexpiredBananas = bananas.filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) < 11
    })
    const soldBananas = bananas.filter(banana => {
      return get(banana, 'sellDate') !== null
    })
    const unsoldBananas = bananas.filter(banana => {
      return get(banana, 'sellDate') === null
    })

    this.setState({
      bananas,
      expiredBananas,
      soldBananas,
      unexpiredBananas,
      unsoldBananas,
    })
  }

  // GAAP Measures: computed properties based on current state.
  soldBananasValue = () => {
    return (this.state.soldBananas.length * this.state.sellPrice).toFixed(2)
  }
  totalBananasCost = () => {
    return (this.state.bananas.length * this.state.buyPrice).toFixed(2)
  }
  totalProfit = () => {
    return (this.soldBananasValue() - this.totalBananasCost()).toFixed(2)
  }

  // Non-GAAP Measures: computed properties based on current state.
  unsoldUnexpiredBananas = () => {
    return this.state.unexpiredBananas.filter(
      banana => banana.sellDate === null
    )
  }
  unsoldUnexpiredBananasValue = () => {
    // prettier-ignore
    return (this.unsoldUnexpiredBananas().length * this.state.sellPrice).toFixed(2)
  }
  unsoldExpiredBananas = () => {
    return this.state.expiredBananas.filter(banana => banana.sellDate === null)
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

  handleBuyPriceChange = event => {
    this.setState({
      buyPrice: Number(event.target.value),
    })
  }

  handleSellPriceChange = event => {
    this.setState({
      sellPrice: Number(event.target.value),
    })
  }

  render() {
    const { bananas, buyPrice, sellPrice, soldBananas } = this.state

    return (
      <Container fluid={true} className="main-container">
        <h1>Analytics</h1>

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
              <Table.Cell>{soldBananas.length}</Table.Cell>
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
                {bananas.length - this.unsoldExpiredBananas().length}
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
              <Table.Cell>{soldBananas.length}</Table.Cell>
              <Table.Cell>${sellPrice.toFixed(2)}</Table.Cell>
              <Table.Cell positive>${this.soldBananasValue()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Bananas purchased</Table.Cell>
              <Table.Cell>{bananas.length}</Table.Cell>
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
          handleBuyPriceChange={this.handleBuyPriceChange}
          sellPrice={sellPrice}
          handleSellPriceChange={this.handleSellPriceChange}
        />
      </Container>
    )
  }
}

export default Analytics
