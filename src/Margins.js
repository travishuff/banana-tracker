import React from 'react'

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

export default Margins
