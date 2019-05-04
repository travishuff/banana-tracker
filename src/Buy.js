import React from 'react'
import axios from 'axios'

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

  render() {
    const { number, buyDate } = this.state

    return (
      <div>
        <div>Buy</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="number">
            Number of bananas to buy
            <input
              type="number"
              name="number"
              value={number}
              onChange={this.handleNumberChange}
              onBlur={this.handleNumberChange}
            />
          </label>
          <label htmlFor="buyDate">
            Purchase date
            <input
              type="date"
              name="buyDate"
              value={buyDate}
              onChange={this.handleChange}
              onBlur={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Buy
