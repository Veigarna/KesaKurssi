import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import ConfigStore from './store'

import { BrowserRouter as Router } from 'react-router-dom'

const store = ConfigStore()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
