import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0)

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotification(state, { payload }) {
      return payload
    },
    clearNotification(state, { payload }) {
      if (state.id === payload) {
        return {}
      }
      return state
    }
  }
})

const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotification = (notification, timeout) => {
  return dispatch => {
    const id = getId()
    dispatch(setNotification({ notification, id }))
    setTimeout(() => dispatch(clearNotification(id)), timeout * 1000)
  }
}

export default notificationSlice.reducer
