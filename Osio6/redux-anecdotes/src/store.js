import { configureStore } from '@reduxjs/toolkit'
import anecdotereducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
const ConfigStore = () => {
  const store = configureStore({
    reducer: {
      anecdotes: anecdotereducer,
      filter: filterReducer,
      notification: notificationReducer,
    },
  })
  return store
}

export default ConfigStore
