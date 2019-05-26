import React from 'react'
import { create } from 'react-test-renderer'

import Dates from '../Dates'

// Snapshot test
test('snapshot', () => {
  const c = create(<Dates />)

  expect(c.toJSON()).toMatchSnapshot()
})
