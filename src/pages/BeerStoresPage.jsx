import React from 'react'
import Map from '../components/Map/Map'
import { SessionContext }  from '../context/SessionContext'
import { StyleContext } from '../context/StyleContext'
import SideBar from '../components/SideBar'


import clsx from 'clsx'

const BeerStoresPage  = props => {

  const { classes } = React.useContext(StyleContext)
  const sessionState = React.useContext(SessionContext)

  return (
    <React.Fragment>
      <SideBar />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sessionState.sidebar.open,
        })}
        >
        <div className={classes.drawerHeader} />
        <Map />
      </main>
    </React.Fragment>
  )
}

export default BeerStoresPage