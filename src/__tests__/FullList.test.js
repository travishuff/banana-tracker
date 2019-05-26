import React from 'react'
import { create } from 'react-test-renderer'

import FullList from '../FullList'

// Snapshot test
test('snapshot', () => {
  const c = create(<FullList />)

  expect(c.toJSON()).toMatchSnapshot()
})
