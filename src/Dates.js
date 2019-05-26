import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'semantic-ui-react'

const Dates = ({ end, handleDateChange, start }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Input
          label="Start Date:"
          width={4}
          type="date"
          name="start"
          value={start}
          onChange={handleDateChange}
          onBlur={handleDateChange}
        />
        <Form.Input
          label="End Date:"
          width={4}
          type="date"
          name="end"
          value={end}
          onChange={handleDateChange}
          onBlur={handleDateChange}
        />
      </Form.Group>
    </Form>
  )
}

Dates.propTypes = {
  end: PropTypes.string,
  handleDateChange: PropTypes.func,
  start: PropTypes.string,
}

export default Dates
