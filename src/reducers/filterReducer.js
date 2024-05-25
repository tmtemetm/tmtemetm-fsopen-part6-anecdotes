const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case 'SET_FILTER':
      return payload
    default:
      return state
  }
}

export const changeFilter = filter => ({
  type: 'SET_FILTER',
  payload: filter
})

export default filterReducer
