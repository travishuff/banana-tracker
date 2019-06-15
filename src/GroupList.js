import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'
import { Link } from '@reach/router'

import { Container, Table } from 'semantic-ui-react'

const GroupList = () => {
  const [bananasObj, updateBananasObj] = useState({})

  const parseBananas = bananas => {
    // Sort bananas by buyDate, then secondly by sellDate
    const sortedBananas = bananas.sort((a, b) => {
      const n = Date.parse(a.buyDate) - Date.parse(b.buyDate)
      if (n !== 0) {
        return n
      }

      return Date.parse(a.sellDate) - Date.parse(b.sellDate)
    })

    // Create a flattened data structure to display banana groups into table rows.
    /* Ex: 3 columns--
      1) buyDate
      2) sellDate
        (the sell date if sold, null if not sold, 'EXPIRED' if not sold and past expiration)
      3) Number of bananas bought on a buyDate and sold on a sellDate/null/expired */
    const bananasObj = sortedBananas.reduce((all, item) => {
      if (item.sellDate === null) {
        if (differenceInCalendarDays(new Date(), item.buyDate) >= 11) {
          item.sellDate = 'EXPIRED'
        }
      }

      // Make a unique key to collate the object correctly.
      // We will slice out the buyDate in the render function.
      const key = item.buyDate + item.sellDate
      if (!all[key]) {
        all[key] = { [item.sellDate]: 1 }
      } else if (all[key] && all[key][item.sellDate]) {
        all[key][item.sellDate]++
      } else if (all[key] && !all[key][item.sellDate]) {
        all[key] = { [item.sellDate]: 1 }
      }

      return all
    }, {})

    return bananasObj
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/bananas')
      .then(response => updateBananasObj(parseBananas(response.data)))
      .catch(console.error)
  }, [])

  return (
    <Container fluid={true} className="main-container">
      <h1>
        <Link to="/analytics">←</Link> Banana Groups
      </h1>

      <Table color="green" unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Buy Date</Table.HeaderCell>
            <Table.HeaderCell>Sale Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(bananasObj).map(key => {
            const [sellDate, quantity] = Object.entries(bananasObj[key]).flat()
            const buyDate = key.slice(0, 10)

            return (
              <Table.Row key={key}>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>{buyDate}</Table.Cell>
                <Table.Cell>{sellDate}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default GroupList
