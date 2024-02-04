// ** React Imports
import ReactDOM from 'react-dom/client'

// ** Router Imports
import { BrowserRouter } from 'react-router-dom'

// ** Components Imports
import App from './App'

// ** Recoil Imports
import { RecoilRoot } from 'recoil'

// ** Style Imports
import '@/src/style/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
)
