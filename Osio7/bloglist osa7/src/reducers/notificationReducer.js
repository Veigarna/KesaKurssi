import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    notificationClear(state, action) {
      console.log(state, action)
      return ''
    },
  },
})

export const { showNotification, notificationClear } = notificationSlice.actions

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      //clear
      dispatch(notificationClear())
    }, 5000)
  }
}
export default notificationSlice.reducer
