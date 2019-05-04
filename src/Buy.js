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

class Buy extends React.Component {
  state = {
    number: '',
    buyDate: '',
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
      const response = await axios.post(
        'http://localhost:8080/api/bananas',
        this.state
      )
      console.log('submitted!', response)
    } catch (error) {
      console.error(error)
    }
  }
  handleReset = () => {
    this.setState({
      number: '',
      buyDate: '',
    })
  }
  onSubmit = event => {
    this.handleSubmit(event)
      .then(this.handleReset())
      .catch(console.error)
  }

  render() {
    const { number, buyDate } = this.state

    return (
      <Container fluid={true}>
        <Row className="row-title">
          <Col>Buy Bananas</Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <label htmlFor="number">
                  Number of bananas to buy:
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
                <label htmlFor="buyDate">
                  Purchase date:
                  <FormInput
                    size="sm"
                    type="date"
                    name="buyDate"
                    value={buyDate}
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

export default Buy
