import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'semantic-ui-react'

const Margins = ({ buyPrice, sellPrice, handlePriceChange }) => {
  return (
    <React.Fragment>
      <h3>Experiment with your margins!</h3>

      <Form>
        <Form.Group>
          <Form.Input
            label="Buy Price:"
            width={4}
            type="number"
            name="buyPrice"
            value={buyPrice}
            onChange={handlePriceChange}
            onBlur={handlePriceChange}
          />
          <Form.Input
            label="Sell Price:"
            width={4}
            type="number"
            name="sellPrice"
            value={sellPrice}
            onChange={handlePriceChange}
            onBlur={handlePriceChange}
          />
        </Form.Group>
      </Form>
    </React.Fragment>
  )
}

Margins.propTypes = {
  buyPrice: PropTypes.number,
  handlePriceChange: PropTypes.func,
  sellPrice: PropTypes.number,
}

export default Margins
