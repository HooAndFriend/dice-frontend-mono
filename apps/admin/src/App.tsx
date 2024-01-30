// ** Router Imports
import { Routes, Route } from 'react-router-dom'
import { ProtectRoute, PublicRoute } from './utils/protect-route'

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
            <Route element={<PublicRoute />}>
              <Route path="/" element={<TestPage />} />
            </Route>
            <Route element={<ProtectRoute />}></Route>
          </Routes>
        </DialogProvider>
      </ErrorProvider>
    </ThemeProvider>
  )
}

export default App
