import React from 'react'
import ReactDOM from 'react-dom'
import './assets/stylesheets/index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'
import ProvideAuth from './contexts/authContext'
import theme from './assets/themes/mui'

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

reportWebVitals()
