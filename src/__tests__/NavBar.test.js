import React from 'react'
import { create } from 'react-test-renderer'

import NavBar from '../NavBar'

// Snapshot test
test('snapshot', () => {
  const c = create(<NavBar />)

  expect(c.toJSON()).toMatchSnapshot()
})
