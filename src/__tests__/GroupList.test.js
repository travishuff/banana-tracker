import React from 'react'
import { create } from 'react-test-renderer'

import GroupList from '../GroupList'

// Snapshot test
test('snapshot', () => {
  const c = create(<GroupList />)

  expect(c.toJSON()).toMatchSnapshot()
})
