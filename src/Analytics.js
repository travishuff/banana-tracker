import React, { useState, useEffect } from 'react'
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

const Analytics = () => {
  const [state, updateState] = useState({
    buyPrice: 0.2,
    sellPrice: 0.35,
    start: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
    end: format(lastDayOfMonth(new Date()), 'YYYY-MM-DD'),
  })

  const [bananasData, updateBananasData] = useState([])

  const bananasByTime = () => {
    return bananasData.filter(banana => {
      const buyDate = get(banana, 'buyDate', '')
      const sellDate = get(banana, 'sellDate', '')

      return (
        Date.parse(buyDate) >= Date.parse(state.start) &&
        Date.parse(buyDate) <= Date.parse(state.end) &&
        (sellDate === null ||
          (Date.parse(sellDate) >= Date.parse(state.start) &&
            Date.parse(sellDate) <= Date.parse(state.end)))
      )
    })
  }
  const expiredBananas = () => {
    return bananasByTime().filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) >= 11
    })
  }
  const soldBananas = () => {
    return bananasByTime().filter(banana => get(banana, 'sellDate') !== null)
  }
  const unexpiredBananas = () => {
    return bananasByTime().filter(banana => {
      return differenceInCalendarDays(new Date(), get(banana, 'buyDate')) < 11
    })
  }

  // GAAP Measures: computed properties based on current state.
  const soldBananasValue = () => {
    return (soldBananas().length * state.sellPrice).toFixed(2)
  }
  const totalBananasCost = () => {
    return (bananasByTime().length * state.buyPrice).toFixed(2)
  }
  const totalProfit = () => {
    return (soldBananasValue() - totalBananasCost()).toFixed(2)
  }

  // Non-GAAP Measures: computed properties based on current state.
  const unsoldUnexpiredBananas = () => {
    return unexpiredBananas().filter(banana => banana.sellDate === null)
  }
  const unsoldUnexpiredBananasValue = () => {
    // prettier-ignore
    return (unsoldUnexpiredBananas().length * state.sellPrice).toFixed(2)
  }
  const unsoldExpiredBananas = () => {
    return expiredBananas().filter(banana => banana.sellDate === null)
  }
  const unsoldExpiredBananasCost = () => {
    return (unsoldExpiredBananas().length * state.buyPrice).toFixed(2)
  }
  const allOtherBananasCost = () => {
    // prettier-ignore
    return (totalBananasCost() - unsoldExpiredBananasCost()).toFixed(2)
  }
  const potentialProfit = () => {
    return (
      Number(soldBananasValue()) +
      Number(unsoldUnexpiredBananasValue()) -
      Number(totalBananasCost())
    ).toFixed(2)
  }

  const handlePriceChange = event => {
    updateState({
      ...state,
      [event.target.name]: Number(event.target.value),
    })

    localStorage.setItem(event.target.name, event.target.value)
  }

  const handleDateChange = event => {
    updateState({
      ...state,
      [event.target.name]: event.target.value,
    })

    localStorage.setItem(event.target.name, event.target.value)
  }

  const resetFields = () => {
    updateState({
      buyPrice: 0.2,
      sellPrice: 0.35,
      start: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
      end: format(lastDayOfMonth(new Date()), 'YYYY-MM-DD'),
    })

    localStorage.clear()
  }

  // hooks + localStorage something wrong here..
  const hydrateStateWithLocalStorage = () => {
    for (let key in state) {
      if (window.localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)

        try {
          value = JSON.parse(value)
          updateState({ ...state, [key]: value })
        } catch (e) {
          updateState({ ...state, [key]: value })
        }
      }
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/bananas')
      .then(response => {
        updateBananasData(response.data)
        hydrateStateWithLocalStorage()
      })
      .catch(console.error)
  }, [])

  return (
    <Container fluid={true} className="main-container">
      <h1>Analytics</h1>

      <Dates
        start={state.start}
        end={state.end}
        handleDateChange={handleDateChange}
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
            <Table.Cell>{soldBananas().length}</Table.Cell>
            <Table.Cell>${state.sellPrice.toFixed(2)}</Table.Cell>
            <Table.Cell positive>${soldBananasValue()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Unsold unexpired bananas</Table.Cell>
            <Table.Cell>{unsoldUnexpiredBananas().length}</Table.Cell>
            <Table.Cell>${state.sellPrice.toFixed(2)}</Table.Cell>
            <Table.Cell positive>${unsoldUnexpiredBananasValue()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Unsold expired bananas</Table.Cell>
            <Table.Cell>{unsoldExpiredBananas().length}</Table.Cell>
            <Table.Cell>${state.buyPrice.toFixed(2)}</Table.Cell>
            <Table.Cell negative>${unsoldExpiredBananasCost()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>All other purchased bananas</Table.Cell>
            <Table.Cell>
              {bananasByTime().length - unsoldExpiredBananas().length}
            </Table.Cell>
            <Table.Cell>${state.buyPrice.toFixed(2)}</Table.Cell>
            <Table.Cell negative>${allOtherBananasCost()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan="3" textAlign="right">
              Potential Profit/Loss
            </Table.Cell>
            <Table.Cell
              positive={potentialProfit() > 0 ? true : false}
              negative={potentialProfit() < 0 ? true : false}
            >
              ${Math.abs(potentialProfit()).toFixed(2)}
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
            <Table.Cell>{soldBananas().length}</Table.Cell>
            <Table.Cell>${state.sellPrice.toFixed(2)}</Table.Cell>
            <Table.Cell positive>${soldBananasValue()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bananas purchased</Table.Cell>
            <Table.Cell>{bananasByTime().length}</Table.Cell>
            <Table.Cell>${state.buyPrice.toFixed(2)}</Table.Cell>
            <Table.Cell negative>${totalBananasCost()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan="3" textAlign="right">
              Profit/Loss
            </Table.Cell>
            <Table.Cell
              positive={totalProfit() > 0 ? true : false}
              negative={totalProfit() < 0 ? true : false}
            >
              ${Math.abs(totalProfit()).toFixed(2)}
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
        buyPrice={state.buyPrice}
        sellPrice={state.sellPrice}
        handlePriceChange={handlePriceChange}
      />

      <Form.Button
        color="red"
        onClick={resetFields}
        content="Reset All Form Fields"
      />
    </Container>
  )
}

export default Analytics
