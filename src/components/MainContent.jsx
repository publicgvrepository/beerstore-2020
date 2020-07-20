import React from 'react'
import Map from './Map/Map'
import { SessionContext }  from '../context/SessionContext'
import { StyleContext } from '../context/StyleContext'


import clsx from 'clsx'

const MainContent = props => {

  const { classes } = React.useContext(StyleContext)
  const sessionState = React.useContext(SessionContext)

  return (
    <React.Fragment>
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

export default MainContent
