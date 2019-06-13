import { v4 } from 'uuid'

export const buyBanana = buyDate => ({
  type: 'BUY_BANANA',
  payload: {
    id: v4(),
    buyDate,
    sellDate: null,
  },
})

export const sellBanana = (id, buyDate, sellDate) => ({
  type: 'SELL_BANANA',
  payload: {
    id,
    buyDate,
    sellDate,
  },
})

export const initializeStore = data => ({
  type: 'INITIALIZE_STORE',
  payload: data,
})
