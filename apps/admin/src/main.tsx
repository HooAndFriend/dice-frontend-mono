// ** React Imports
import ReactDOM from 'react-dom/client'

// ** Router Imports
import { BrowserRouter } from 'react-router-dom'

// ** Components Imports
import App from './App'

// ** Recoil Imports
import { RecoilRoot } from 'recoil'

// ** Swr Imports
import { SWRConfig } from 'swr'

// ** Style Imports
import '@/src/style/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <RecoilRoot>
    <SWRConfig>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </RecoilRoot>,
)
