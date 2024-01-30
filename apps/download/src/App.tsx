// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Router Imports
import TestPage from './pages/test-age'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'

const App = () => {
  return (
    <ErrorProvider>
      <DialogProvider>
        <Routes>
          <Route path="/" element={<TestPage />} />
        </Routes>
      </DialogProvider>
    </ErrorProvider>
  )
}

export default App
