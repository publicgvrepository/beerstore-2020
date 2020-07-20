import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import SessionProvider from './context/SessionContext'
import BeerStoreProvider from './context/BeerStoreContext'
import { StyleContext } from './context/StyleContext'


function App() {
  const { classes } = React.useContext(StyleContext)

  return (
    <SessionProvider>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <BeerStoreProvider>
            <SideBar />
            <MainContent />
          </BeerStoreProvider>
        </div>
    </SessionProvider>
  )
}

export default App;