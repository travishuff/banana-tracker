export const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'BUY_BANANA': {
      const { id, buyDate, sellDate } = action.payload

      return [
        ...state,
        {
          id,
          buyDate,
          sellDate,
        },
      ]
    }
    case 'SELL_BANANA': {
      const { id, buyDate, sellDate } = action.payload
      const prevState = state.filter(item => item.id !== id)

      return [
        ...prevState,
        {
          id,
          buyDate,
          sellDate,
        },
      ]
    }
    case 'INITIALIZE_STORE': {
      return [...state, ...action.payload]
    }
    default:
      return state
  }
}
