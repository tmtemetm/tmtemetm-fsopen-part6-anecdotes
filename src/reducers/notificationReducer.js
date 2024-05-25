import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Testing...',
  reducers: {
    setNotification(state, { payload }) {
      return payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
