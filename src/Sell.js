import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addDays, compareAsc, isAfter } from 'date-fns'

import { Container, Form, Message } from 'semantic-ui-react'
import { sellBanana } from './redux/actionCreators'

class Sell extends React.Component {
  state = {
    number: '',
    sellDate: '',
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
      sellDate: event.target.value,
      hideSuccess: true,
      hideError: true,
      dateError: false,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (this.validate()) {
      const soldBananas = this.sellBananas()
      soldBananas.forEach(banana => {
        this.props.sellBanana(banana.id, banana.buyDate, this.state.sellDate)
      })

      const response = await axios
        .put('http://localhost:8080/api/bananas', this.state)
        .catch(console.error)

      // pass in response so this function doesn't run until above promise is resolved
      this.handleSuccessfulSubmit(response)
    }
  }

  handleSuccessfulSubmit = () => {
    this.setState(
      {
        number: '',
        sellDate: '',
        hideSuccess: false,
        hideError: true,
      },
      this.getBananas
    )
  }

  resetForm = event => {
    event.preventDefault()

    this.setState({
      number: '',
      sellDate: '',
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
      this.state.number > 50 ||
      this.state.number > this.getAvailableBananas().length
    ) {
      if (!this.availableDay()) {
        this.setState(prevState => {
          return {
            dateError: true,
            errorMsg: prevState.errorMsg + ' Unavailable date.',
          }
        })
      }
      if (
        this.state.number < 1 ||
        this.state.number > 50 ||
        this.state.number > this.getAvailableBananas().length
      ) {
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
    const today = new Date().toLocaleDateString()
    const compareDates = compareAsc(this.state.sellDate, today)

    return compareDates >= 0
  }

  sellBananas = () => {
    const { sellDate, number } = this.state
    const { unsoldBananas } = this.props

    const soldBananas = []
    let numRemainingToSell = number

    for (const b of unsoldBananas) {
      const compareDates = compareAsc(sellDate, b.buyDate)
      const isAvailable = compareDates <= 10

      if (numRemainingToSell < 1) {
        break
      }
      if (!b.sellDate && b.buyDate <= sellDate && isAvailable) {
        soldBananas.push(b)
        numRemainingToSell--
      }
    }

    return soldBananas
  }

  getAvailableBananas = () => {
    return this.props.unsoldBananas.filter(banana => {
      if (isAfter(banana.buyDate, this.state.sellDate)) {
        return false
      }
      const expireDate = addDays(banana.buyDate, 10)
      return isAfter(expireDate, this.state.sellDate)
    })
  }

  render() {
    const {
      number,
      sellDate,
      hideSuccess,
      hideError,
      numberError,
      dateError,
      errorMsg,
    } = this.state

    return (
      <Container fluid={true} className="main-container">
        <h1>Sell Bananas</h1>
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
            label="Sale date:"
            width={8}
            type="date"
            name="sellDate"
            value={sellDate}
            onChange={this.handleDateChange}
            onBlur={this.handleDateChange}
            error={dateError}
          />
          <Message
            positive
            hidden={hideSuccess}
            header="Success"
            content="You sold bananas!"
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

const parseBananas = bananas => {
  return bananas.filter(banana => {
    return banana.sellDate === null
  })
}

const mapStateToProps = state => {
  return {
    unsoldBananas: parseBananas(state),
  }
}

export default connect(
  mapStateToProps,
  { sellBanana }
)(Sell)
