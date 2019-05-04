import React from 'react'
import axios from 'axios'

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

  render() {
    const { number, sellDate } = this.state

    return (
      <div>
        <div>Sell</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="number">
            Number of bananas to sell
            <input
              type="number"
              name="number"
              value={number}
              onChange={this.handleNumberChange}
              onBlur={this.handleNumberChange}
            />
          </label>
          <label htmlFor="sellDate">
            Sale date
            <input
              type="date"
              name="sellDate"
              value={sellDate}
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

export default Sell
