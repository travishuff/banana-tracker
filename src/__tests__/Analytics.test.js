import React from 'react'
import { create } from 'react-test-renderer'

import Analytics from '../Analytics'

// Snapshot test
test('snapshot', () => {
  const c = create(<Analytics />)

  expect(c.toJSON()).toMatchSnapshot()
})

// Unit testing
test('handleBuyPriceChange method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.buyPrice = 0.25
  const event = {
    target: {
      value: 0.5,
    },
  }
  instance.handleBuyPriceChange(event)
  expect(instance.state.buyPrice).toBe(0.5)
})

test('handleSellPriceChange method changes value', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()

  instance.state.sellPrice = 0.5
  const event = {
    target: {
      value: 1,
    },
  }
  instance.handleBuyPriceChange(event)
  expect(instance.state.buyPrice).toBe(1)
})

test('parseBananas method creates correct arrays', () => {
  const c = create(<Analytics />)
  const instance = c.getInstance()
  const bananas = [
    {
      id: '2f460f57-5691-4198-a4b6-05c772f76467',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'bdc2d386-e088-4d97-a013-f2deebb93271',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'a6faa3e7-ed3d-47ad-994d-12d6f79dd3f2',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'dcff44af-cc04-4a64-a29d-a0426af3990c',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: '707d1010-37d1-4906-a888-7b41a3dae231',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: 'a78a031c-bc21-47e2-8973-90bbd378ae58',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: '5bcb2627-d4ba-486b-b770-5d470b303485',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: 'f8415818-a10d-4fec-b47a-3c0f6623261d',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: '7b183bee-dac5-4739-b25a-bfd81d8af9be',
      buyDate: '2019-04-13',
      sellDate: null,
    },
  ]

  instance.parseBananas(bananas)
  expect(instance.state.soldBananas).toStrictEqual([
    {
      id: '2f460f57-5691-4198-a4b6-05c772f76467',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'bdc2d386-e088-4d97-a013-f2deebb93271',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'a6faa3e7-ed3d-47ad-994d-12d6f79dd3f2',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
    {
      id: 'dcff44af-cc04-4a64-a29d-a0426af3990c',
      buyDate: '2019-05-01',
      sellDate: '2019-05-03',
    },
  ])
  expect(instance.state.unsoldBananas).toStrictEqual([
    {
      id: '707d1010-37d1-4906-a888-7b41a3dae231',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: 'a78a031c-bc21-47e2-8973-90bbd378ae58',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: '5bcb2627-d4ba-486b-b770-5d470b303485',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: 'f8415818-a10d-4fec-b47a-3c0f6623261d',
      buyDate: '2019-04-13',
      sellDate: null,
    },
    {
      id: '7b183bee-dac5-4739-b25a-bfd81d8af9be',
      buyDate: '2019-04-13',
      sellDate: null,
    },
  ])
})
