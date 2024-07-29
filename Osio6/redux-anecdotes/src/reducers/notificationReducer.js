import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationClear(state, action) {
      console.log(state, action)
      return ''
    },
  },
})

export const { notificationChange, notificationClear } =
  notificationSlice.actions

// ilmotus metodi
export const setNotification = (message, time) => {
  return async (dispatch) => {
    //asetetaan viesti
    dispatch(notificationChange(message))
    setTimeout(() => {
      //clear
      dispatch(notificationClear())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
