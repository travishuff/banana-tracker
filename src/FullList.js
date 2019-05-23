import React from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import sortBy from 'lodash/sortBy'

import { Container, Table } from 'semantic-ui-react'

class FullList extends React.Component {
  state = {
    column: null,
    direction: null,
    bananas: [],
  }

  handleSort = clickedColumn => () => {
    const { column, bananas, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        bananas: sortBy(bananas, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      bananas: bananas.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  async componentDidMount() {
    const response = await axios
      .get('http://localhost:8080/api/bananas')
      .catch(console.error)
    this.setState({ bananas: response.data })
  }

  render() {
    const { column, direction, bananas } = this.state

    return (
      <Container fluid={true} className="main-container">
        <h1>
          <Link to="/analytics">←</Link> Full List of Bananas
        </h1>

        <Table color="green" sortable celled unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'id' ? direction : null}
                onClick={this.handleSort('id')}
              >
                ID ({bananas.length} total)
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'buyDate' ? direction : null}
                onClick={this.handleSort('buyDate')}
              >
                buyDate
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'sellDate' ? direction : null}
                onClick={this.handleSort('sellDate')}
              >
                sellDate
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bananas.map(({ buyDate, sellDate, id }) => (
              <Table.Row key={id}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{buyDate}</Table.Cell>
                <Table.Cell>{sellDate === null ? 'null' : sellDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default FullList
