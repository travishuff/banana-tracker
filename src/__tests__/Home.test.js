import React from 'react'
import { create } from 'react-test-renderer'

import Home from '../Home'

// Snapshot test
test('snapshot', () => {
  const c = create(<Home />)

  expect(c.toJSON()).toMatchSnapshot()
})
