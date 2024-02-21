// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'

// ** Component Imports
import LoginPage from './pages/login-page'
import Dashboard from './components/Dashboard'
import { ProtectRoute, PublicRoute } from './utils/protect-route'

const App = () => {
  return (
    <ErrorProvider>
      <DialogProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </DialogProvider>
    </ErrorProvider>
  )
}

export default App
