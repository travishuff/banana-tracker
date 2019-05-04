import React from 'react'
import axios from 'axios'
import { Button, Form, FormInput, FormGroup } from 'shards-react'

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
  onSubmit = event => {
    this.handleSubmit(event)
      .then(this.handleReset())
      .catch(console.error)
  }

  render() {
    const { number, sellDate } = this.state

    return (
      <div>
        <div>Sell</div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <label htmlFor="number">
              Number of bananas to sell
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
              Sale date
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
      </div>
    )
  }
}

export default Sell
