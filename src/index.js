import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { SnackbarProvider } from 'notistack'
import StyleProvider from './context/StyleContext'


ReactDOM.render(
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
      <React.StrictMode>
        <StyleProvider>
          <App />
        </StyleProvider>
        </React.StrictMode>
    </SnackbarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
