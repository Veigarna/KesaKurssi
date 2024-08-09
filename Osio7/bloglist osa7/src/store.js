import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
const ConfigStore = () => {
  const store = configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer,
      blogs: blogsReducer,
    },
  })
  return store
}

export default ConfigStore
