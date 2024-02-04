// ** React Imports
import ReactDOM from 'react-dom/client'

// ** Router Imports
import { BrowserRouter } from 'react-router-dom'

// ** Components Imports
import App from './App'

// ** Style Imports
import '@/style/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
