import React from 'react'
import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'
import get from 'lodash/get'

import './css/analytics.css'

import { Container, Row, Col } from 'shards-react'
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

  componentDidMount() {
    axios
      .get('http://localhost:8080/api/bananas')
      .then(response => {
        this.parseBananas(response.data)
      })
      .catch(console.error)
  }

  parseBananas = bananas => {
    const expiredBananas = bananas.filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) >= 10
    })
    const unexpiredBananas = bananas.filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) < 10
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

  // GAAP Accounting
  soldBananasValue = () => {
    return (this.state.soldBananas.length * this.state.sellPrice).toFixed(2)
  }
  totalBananasCost = () => {
    return (this.state.bananas.length * this.state.buyPrice).toFixed(2)
  }
  totalProfit = () => {
    return (this.soldBananasValue() - this.totalBananasCost()).toFixed(2)
  }

  // Non-GAAP Accounting
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
      <Container fluid={true}>
        <Row className="row-title">
          <Col>Analytics</Col>
        </Row>
        <Row className="row-title">
          <Col>Non-GAAP Measures</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Revenue</Col>
          <Col>Amount</Col>
          <Col>Price</Col>
          <Col>Value</Col>
        </Row>
        <Row>
          <Col>Bananas sold</Col>
          <Col>{soldBananas.length}</Col>
          <Col>${sellPrice.toFixed(2)}</Col>
          <Col>${this.soldBananasValue()}</Col>
        </Row>
        <Row>
          <Col>Unsold unexpired bananas</Col>
          <Col>{this.unsoldUnexpiredBananas().length}</Col>
          <Col>{sellPrice.toFixed(2)}</Col>
          <Col>{this.unsoldUnexpiredBananasValue()}</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Expenses</Col>
          <Col>Amount</Col>
          <Col>Price</Col>
          <Col>Value</Col>
        </Row>
        <Row>
          <Col>Unsold expired bananas</Col>
          <Col>{this.unsoldExpiredBananas().length}</Col>
          <Col>{buyPrice.toFixed(2)}</Col>
          <Col>{this.unsoldExpiredBananasCost()}</Col>
        </Row>
        <Row>
          <Col>All other purchased bananas</Col>
          <Col>{bananas.length - this.unsoldExpiredBananas().length}</Col>
          <Col>{buyPrice.toFixed(2)}</Col>
          <Col>{this.allOtherBananasCost()}</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Profit/Loss</Col>
          <Col />
          <Col />
          <Col />
        </Row>
        <Row className="row-data">
          <Col>total</Col>
          <Col />
          <Col />
          <Col>${this.potentialProfit()}</Col>
        </Row>

        <Row className="row-title">
          <Col>GAAP Measures</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Revenue</Col>
          <Col>Amount</Col>
          <Col>Price</Col>
          <Col>Value</Col>
        </Row>
        <Row className="row-data">
          <Col>Bananas</Col>
          <Col>{soldBananas.length}</Col>
          <Col>{sellPrice.toFixed(2)}</Col>
          <Col>{this.soldBananasValue()}</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Expenses</Col>
          <Col>Amount</Col>
          <Col>Price</Col>
          <Col>Value</Col>
        </Row>
        <Row className="row-data">
          <Col>Bananas</Col>
          <Col>{bananas.length}</Col>
          <Col>{buyPrice.toFixed(2)}</Col>
          <Col>{this.totalBananasCost()}</Col>
        </Row>
        <Row className="row-subtitle">
          <Col>Profit/Loss</Col>
          <Col />
          <Col />
          <Col />
        </Row>
        <Row className="row-data">
          <Col>total</Col>
          <Col />
          <Col />
          <Col>${this.totalProfit()}</Col>
        </Row>
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
