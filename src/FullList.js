import React from 'react'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import sortBy from 'lodash/sortBy'

import { Container, Table } from 'semantic-ui-react'

class FullList extends React.Component {
  state = {
    column: null,
    direction: null,
    bananasForSorting: this.props.bananas,
  }

  handleSort = clickedColumn => () => {
    const { column, bananasForSorting, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        bananasForSorting: sortBy(bananasForSorting, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      bananasForSorting: bananasForSorting.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, direction, bananasForSorting } = this.state

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
                ID ({bananasForSorting.length} total)
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
            {bananasForSorting.map(({ buyDate, sellDate, id }) => (
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

const mapStateToProps = state => {
  return {
    bananas: state,
  }
}

export default connect(mapStateToProps)(FullList)
