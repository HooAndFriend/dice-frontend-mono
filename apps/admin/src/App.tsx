// ** Router Imports
import { Routes, Route } from 'react-router-dom'

// ** Router Imports
import TestPage from './pages/test-age'

// ** Context Imports
import { ErrorProvider } from './context/ErrorContext'
import { DialogProvider } from './context/DialogContext'

// ** Style Imports
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme'
import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ backgroundColor: 'blue' }} />
      <CssBaseline />
      <ErrorProvider>
        <DialogProvider>
          <Routes>
            <Route path="/" element={<TestPage />} />
          </Routes>
        </DialogProvider>
      </ErrorProvider>
    </ThemeProvider>
  )
}

export default App
