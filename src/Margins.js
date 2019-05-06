import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, FormGroup, FormInput } from 'shards-react'

class Margins extends React.Component {
  render() {
    const {
      buyPrice,
      handleBuyPriceChange,
      sellPrice,
      handleSellPriceChange,
    } = this.props

    return (
      <React.Fragment>
        <Row className="row-title">
          <Col>Experiment with your margins!</Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <label htmlFor="buy">
                Buy Price
                <FormInput
                  type="number"
                  name="buy"
                  value={buyPrice}
                  onChange={handleBuyPriceChange}
                  onBlur={handleBuyPriceChange}
                  size="sm"
                />
              </label>
            </FormGroup>
            <FormGroup>
              <label htmlFor="sell">
                Sell Price
                <FormInput
                  type="number"
                  name="sell"
                  value={sellPrice}
                  onChange={handleSellPriceChange}
                  onBlur={handleSellPriceChange}
                  size="sm"
                />
              </label>
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

Margins.propTypes = {
  buyPrice: PropTypes.number,
  handleBuyPriceChange: PropTypes.func,
  sellPrice: PropTypes.number,
  handleSellPriceChange: PropTypes.func,
}

export default Margins
