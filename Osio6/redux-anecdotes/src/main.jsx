import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import ConfigStore from './store'

const store = ConfigStore()

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
