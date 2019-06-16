import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import sortBy from 'lodash/sortBy'

import { Container, Table } from 'semantic-ui-react'

const FullList = () => {
  const [order, updateOrder] = useState({
    column: null,
    direction: null,
  })

  const [bananas, updateBananas] = useState([])

  const handleSort = clickedColumn => () => {
    if (order.column !== clickedColumn) {
      updateOrder({
        column: clickedColumn,
        direction: 'ascending',
      })
      updateBananas(sortBy(bananas, [clickedColumn]))

      return
    }

    updateOrder({
      ...order,
      direction: order.direction === 'ascending' ? 'descending' : 'ascending',
    })
    updateBananas(bananas.reverse())
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/bananas')
      .then(response => updateBananas(response.data))
      .catch(console.error)
  }, [])

  return (
    <Container fluid={true} className="main-container">
      <h1>
        <Link to="/analytics">←</Link> Full List of Bananas
      </h1>

      <Table color="green" sortable celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={order.column === 'id' ? order.direction : null}
              onClick={handleSort('id')}
            >
              ID ({bananas.length} total)
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={order.column === 'buyDate' ? order.direction : null}
              onClick={handleSort('buyDate')}
            >
              buyDate
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={order.column === 'sellDate' ? order.direction : null}
              onClick={handleSort('sellDate')}
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

export default FullList
