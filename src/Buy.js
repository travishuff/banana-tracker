import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { compareAsc } from 'date-fns'

import { Container, Form, Message } from 'semantic-ui-react'
import { buyBanana } from './redux/actionCreators'

class Buy extends React.Component {
  state = {
    number: '',
    buyDate: '',
    hideError: true,
    hideSuccess: true,
    dateError: false,
    numberError: false,
    errorMsg: '',
  }

  handleNumberChange = event => {
    if (!event.target.value) {
      this.setState({
        number: '',
      })
    } else {
      this.setState({
        number: Number(event.target.value),
        hideSuccess: true,
        hideError: true,
        numberError: false,
      })
    }
  }

  handleDateChange = event => {
    this.setState({
      buyDate: event.target.value,
      hideSuccess: true,
      hideError: true,
      dateError: false,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { buyDate, number } = this.state

    if (this.validate()) {
      for (let i = 0; i < this.state.number; i++) {
        this.props.buyBanana(buyDate)
      }

      const response = await axios
        .post('http://localhost:8080/api/bananas', { buyDate, number })
        .catch(console.error)

      // pass in response so this function doesn't run until above promise is resolved
      this.handleSuccessfulSubmit(response)
    }
  }

  handleSuccessfulSubmit = () => {
    this.setState({
      number: '',
      buyDate: '',
      hideSuccess: false,
      hideError: true,
    })
  }

  resetForm = event => {
    event.preventDefault()

    this.setState({
      number: '',
      buyDate: '',
      hideError: true,
      hideSuccess: true,
      dateError: false,
      numberError: false,
      errorMsg: '',
    })
  }

  validate = () => {
    this.setState({
      hideError: true,
      hideSuccess: true,
      dateError: false,
      numberError: false,
      errorMsg: '',
    })

    if (
      !this.availableDay() ||
      this.state.number < 1 ||
      this.state.number > 50
    ) {
      if (!this.availableDay()) {
        this.setState(prevState => {
          return {
            dateError: true,
            errorMsg: prevState.errorMsg + ' Unavailable date.',
          }
        })
      }
      if (this.state.number < 1 || this.state.number > 50) {
        this.setState(prevState => {
          return {
            numberError: true,
            errorMsg: prevState.errorMsg + ' Unavailable number of bananas.',
          }
        })
      }
      this.setState({
        hideError: false,
        hideSuccess: true,
      })

      return false
    }

    return true
  }

  availableDay = () => {
    if (!this.state.buyDate) return false

    const today = new Date().toLocaleDateString()
    const compareDates = compareAsc(this.state.buyDate, today)

    return compareDates >= 0
  }

  render() {
    const {
      number,
      buyDate,
      hideSuccess,
      hideError,
      numberError,
      dateError,
      errorMsg,
    } = this.state

    return (
      <Container fluid={true} className="main-container">
        <h1>Buy Bananas</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Quantity:"
            width={8}
            placeholder="0"
            type="number"
            name="number"
            value={number}
            onChange={this.handleNumberChange}
            onBlur={this.handleNumberChange}
            error={numberError}
          />
          <Form.Input
            label="Purchase date:"
            width={8}
            type="date"
            name="buyDate"
            value={buyDate}
            onChange={this.handleDateChange}
            onBlur={this.handleDateChange}
            error={dateError}
          />
          <Message
            positive
            hidden={hideSuccess}
            header="Success"
            content="You bought bananas!"
          />
          <Message
            negative
            hidden={hideError}
            header="Error"
            content={errorMsg}
          />
          <Form.Group>
            <Form.Button primary content="Submit" />
            <Form.Button color="red" onClick={this.resetForm} content="Reset" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default connect(
  null,
  { buyBanana }
)(Buy)
