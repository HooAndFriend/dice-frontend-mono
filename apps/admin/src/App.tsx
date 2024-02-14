// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Router Imports
import LoginPage from './pages/login-page'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'

// ** Style Imports

const App = () => {
  return (
    <ErrorProvider>
      <DialogProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </DialogProvider>
    </ErrorProvider>
  )
}

export default App
