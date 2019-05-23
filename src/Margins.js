import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'semantic-ui-react'

const Margins = ({
  buyPrice,
  handleBuyPriceChange,
  sellPrice,
  handleSellPriceChange,
}) => {
  return (
    <React.Fragment>
      <h3>Experiment with your margins!</h3>

      <Form>
        <Form.Input
          label="Buy Price:"
          width={8}
          type="number"
          name="buy"
          value={buyPrice}
          onChange={handleBuyPriceChange}
          onBlur={handleBuyPriceChange}
        />
        <Form.Input
          label="Sell Price:"
          width={8}
          type="number"
          name="sell"
          value={sellPrice}
          onChange={handleSellPriceChange}
          onBlur={handleSellPriceChange}
        />
      </Form>
    </React.Fragment>
  )
}

Margins.propTypes = {
  buyPrice: PropTypes.number,
  handleBuyPriceChange: PropTypes.func,
  sellPrice: PropTypes.number,
  handleSellPriceChange: PropTypes.func,
}

export default Margins
