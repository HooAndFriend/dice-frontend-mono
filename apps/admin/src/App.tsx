// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Router Imports
import LoginPage from './pages/login-page'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'
import Dashboard from './components/Dashboard'

// ** Style Imports

const App = () => {
  return (
    <ErrorProvider>
      <DialogProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </DialogProvider>
    </ErrorProvider>
  )
}

export default App
