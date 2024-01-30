// ** React Imports
import ReactDOM from 'react-dom/client'

// ** Router Imports
import { BrowserRouter } from 'react-router-dom'

// ** Components Imports
import App from './App'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from '@/store'

// ** Style Imports
import '@/style/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
