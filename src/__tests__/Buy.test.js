import React from 'react'
import { create } from 'react-test-renderer'

import Buy from '../Buy'

// Snapshot test
test('snapshot', () => {
  const c = create(<Buy />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing handleReset method
test('handleReset method resets state', () => {
  const c = create(<Buy />)
  const instance = c.getInstance()

  instance.state.number = 22
  instance.state.buyDate = '2019-04-13'

  expect(instance.state.number).toBe(22)
  expect(instance.state.buyDate).toBe('2019-04-13')
  instance.handleReset()
  expect(instance.state.number).toBe('')
  expect(instance.state.buyDate).toBe('')
})
