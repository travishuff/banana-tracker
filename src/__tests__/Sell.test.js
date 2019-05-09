import React from 'react'
import { create } from 'react-test-renderer'

import Sell from '../Sell'

// Snapshot test
test('snapshot', () => {
  const c = create(<Sell />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing
test('handleReset method resets state', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.number = 22
  instance.state.sellDate = '2019-04-13'
  instance.handleReset()
  expect(instance.state.number).toBe('')
  expect(instance.state.sellDate).toBe('')
})

test('handleNumberChange method sets correct value', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.number = ''
  const event = {
    target: {
      value: 1,
    },
  }
  instance.handleNumberChange(event)
  expect(instance.state.number).toBe(1)
})

test('handleChange method sets correct value', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.buyDate = '2019-05-01'
  const event = {
    target: {
      name: 'buyDate',
      value: '2019-06-15',
    },
  }
  instance.handleChange(event)
  expect(instance.state.buyDate).toBe('2019-06-15')
})
