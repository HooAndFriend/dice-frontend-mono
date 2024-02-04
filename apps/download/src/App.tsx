// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Router Imports
import MainPage from './pages/main-page'
import CsPage from './pages/cs-page'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'

const App = () => {
  return (
    <ErrorProvider>
      <DialogProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cs" element={<CsPage />} />
        </Routes>
      </DialogProvider>
    </ErrorProvider>
  )
}

export default App
