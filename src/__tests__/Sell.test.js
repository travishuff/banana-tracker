import React from 'react'
import { create } from 'react-test-renderer'

import Sell from '../Sell'

// Snapshot test
test('snapshot', () => {
  const c = create(<Sell />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing
test('handleNumberChange method sets value', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.number = 0
  const event = {
    target: {
      value: 10,
    },
  }
  instance.handleNumberChange(event)
  expect(instance.state.number).toBe(10)
})

test('handleDateChange method sets value', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.sellDate = '2019-05-01'
  const event = {
    target: {
      value: '2019-06-15',
    },
  }
  instance.handleDateChange(event)
  expect(instance.state.sellDate).toBe('2019-06-15')
})

test('handleSuccessfulSubmit method resets part of state', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.number = 22
  instance.state.sellDate = '2019-04-13'
  instance.state.hideError = true
  instance.state.hideSuccess = false
  instance.handleSuccessfulSubmit()
  expect(instance.state.number).toBe('')
  expect(instance.state.sellDate).toBe('')
  expect(instance.state.hideError).toBe(true)
  expect(instance.state.hideSuccess).toBe(false)
})

test('resetForm method resets state', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()
  const event = { preventDefault: () => {} }

  instance.state.number = 22
  instance.state.sellDate = '2019-04-13'
  instance.state.hideError = false
  instance.state.hideSuccess = false
  instance.state.dateError = true
  instance.state.numberError = true
  instance.state.errorMsg = 'Error message goes here.'
  instance.resetForm(event)
  expect(instance.state.number).toBe('')
  expect(instance.state.sellDate).toBe('')
  expect(instance.state.hideError).toBe(true)
  expect(instance.state.hideSuccess).toBe(true)
  expect(instance.state.dateError).toBe(false)
  expect(instance.state.numberError).toBe(false)
  expect(instance.state.errorMsg).toBe('')
})
