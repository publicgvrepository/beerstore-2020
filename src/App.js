import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import SessionProvider from './context/SessionContext'
import BeerStoreProvider from './context/BeerStoreContext'
import { StyleContext } from './context/StyleContext'
import BeerStoresPage from './pages/BeerStoresPage'
import AddBeerStorePage from './pages/AddBeerStorePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


function App() {
  const { classes } = React.useContext(StyleContext)

  return (
    <SessionProvider>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <BeerStoreProvider>
            <Switch>
              <Route path="/" component={BeerStoresPage} exact />
              <Route path="/add-beerstore" component={AddBeerStorePage} exact />
            </Switch>
          </BeerStoreProvider>
        </div>
      </BrowserRouter>
    </SessionProvider>
  )
}

export default App;