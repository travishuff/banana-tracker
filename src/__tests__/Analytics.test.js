import React from 'react'
import { create } from 'react-test-renderer'

import Analytics from '../Analytics'
import { DB } from '../testDB'

// Snapshot test
test('snapshot', () => {
  const c = create(<Analytics />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing
test('handlePriceChange for `buyPrice` method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.buyPrice = 0.25
  const event = {
    target: {
      name: 'buyPrice',
      value: 0.5,
    },
  }
  instance.handlePriceChange(event)
  expect(instance.state.buyPrice).toBe(0.5)
})

test('handlePriceChange for `sellPrice` method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.sellPrice = 0.35
  const event = {
    target: {
      name: 'sellPrice',
      value: 0.5,
    },
  }
  instance.handlePriceChange(event)
  expect(instance.state.sellPrice).toBe(0.5)
})

test('handleDateChange for `start` method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.start = '2019-06-01'
  const event = {
    target: {
      name: 'start',
      value: '2019-06-30',
    },
  }
  instance.handleDateChange(event)
  expect(instance.state.start).toBe('2019-06-30')
})

test('handleDateChange for `end` method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.end = '2019-06-01'
  const event = {
    target: {
      name: 'end',
      value: '2019-06-30',
    },
  }
  instance.handleDateChange(event)
  expect(instance.state.end).toBe('2019-06-30')
})

test('bananasByTime method creates array', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.start = '2019-06-01'
  instance.state.end = '2019-06-30'
  instance.state.data = DB
  const result = instance.bananasByTime()
  expect(result).toStrictEqual([
    {
      id: '93b03cdc-1480-4220-861c-e20756a43e42',
      buyDate: '2019-06-01',
      sellDate: '2019-06-06',
    },
    {
      id: '19d1adf5-cb4d-42f3-b8b2-116f435c0523',
      buyDate: '2019-06-30',
      sellDate: null,
    },
  ])
})
