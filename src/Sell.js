import React from 'react'
import axios from 'axios'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormInput,
  Row,
} from 'shards-react'

class Sell extends React.Component {
  state = {
    number: '',
    sellDate: '',
  }

  handleNumberChange = event => {
    if (!event.target.value) {
      this.setState({
        number: '',
      })
    } else {
      this.setState({
        number: Number(event.target.value),
      })
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await axios.put(
        'http://localhost:8080/api/bananas',
        this.state
      )

      this.handleReset(response)
      console.log('submitted!', response)
    } catch (error) {
      console.error(error)
    }
  }
  handleReset = () => {
    this.setState({
      number: '',
      sellDate: '',
    })
  }

  render() {
    const { number, sellDate } = this.state

    return (
      <Container fluid={true}>
        <Row className="row-title">
          <Col>Sell Bananas</Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <label htmlFor="number">
                  Number of bananas to sell:
                  <FormInput
                    size="sm"
                    type="number"
                    name="number"
                    value={number}
                    onChange={this.handleNumberChange}
                    onBlur={this.handleNumberChange}
                  />
                </label>
              </FormGroup>
              <FormGroup>
                <label htmlFor="sellDate">
                  Sale date:
                  <FormInput
                    size="sm"
                    type="date"
                    name="sellDate"
                    value={sellDate}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                  />
                </label>
              </FormGroup>
              <Button size="sm">Submit</Button>
              <Button size="sm" theme="danger" onClick={this.handleReset}>
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Sell
