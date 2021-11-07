import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import ProvideAuth from './contexts/authContext'
import theme from './styles/themes/mui'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ProvideAuth>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
