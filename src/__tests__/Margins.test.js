import React from 'react'
import { create } from 'react-test-renderer'

import Margins from '../Margins'

// Snapshot test
test('snapshot', () => {
  const c = create(<Margins />)

  expect(c.toJSON()).toMatchSnapshot()
})
