import React from 'react'
import { create } from 'react-test-renderer'

import Sell from '../Sell'

// Snapshot test
test('snapshot', () => {
  const c = create(<Sell />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing handleReset method
test('handleReset method resets state', () => {
  const c = create(<Sell />)
  const instance = c.getInstance()

  instance.state.number = 22
  instance.state.sellDate = '2019-04-13'

  expect(instance.state.number).toBe(22)
  expect(instance.state.sellDate).toBe('2019-04-13')
  instance.handleReset()
  expect(instance.state.number).toBe('')
  expect(instance.state.sellDate).toBe('')
})
