import React from 'react'
import { create } from 'react-test-renderer'

import Buy from '../Buy'

// Snapshot test
test('snapshot', () => {
  const c = create(<Buy />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing
test('handleNumberChange method sets value', () => {
  const c = create(<Buy />)
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

test('handleDateChange method sets value', () => {
  const c = create(<Buy />)
  const instance = c.getInstance()

  instance.state.buyDate = '2019-05-01'
  const event = {
    target: {
      value: '2019-06-15',
    },
  }
  instance.handleDateChange(event)
  expect(instance.state.buyDate).toBe('2019-06-15')
})

test('handleSuccessfulSubmit method resets part of state', () => {
  const c = create(<Buy />)
  const instance = c.getInstance()

  instance.state.number = 22
  instance.state.buyDate = '2019-04-13'
  instance.state.hideError = false
  instance.state.hideSuccess = true
  instance.handleSuccessfulSubmit()
  expect(instance.state.number).toBe('')
  expect(instance.state.buyDate).toBe('')
  expect(instance.state.hideError).toBe(true)
  expect(instance.state.hideSuccess).toBe(false)
})

test('resetForm method resets state', () => {
  const c = create(<Buy />)
  const instance = c.getInstance()
  const event = { preventDefault: () => {} }

  instance.state.number = 22
  instance.state.buyDate = '2019-04-13'
  instance.state.hideError = false
  instance.state.hideSuccess = false
  instance.state.dateError = true
  instance.state.numberError = true
  instance.state.errorMsg = 'Error message here.'
  instance.resetForm(event)
  expect(instance.state.number).toBe('')
  expect(instance.state.buyDate).toBe('')
  expect(instance.state.hideError).toBe(true)
  expect(instance.state.hideSuccess).toBe(true)
  expect(instance.state.dateError).toBe(false)
  expect(instance.state.numberError).toBe(false)
  expect(instance.state.errorMsg).toBe('')
})
