
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { SessionContext }  from '../context/SessionContext'
import { StyleContext } from '../context/StyleContext'
import clsx from 'clsx'

const Header = props => {

  const sessionState = React.useContext(SessionContext);
  const { classes } = React.useContext(StyleContext);

  const handlerSearchInput = input => {
    sessionState.handleFilterSideBar(input)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="transparent"
        className={clsx(classes.appBar, {
        [classes.appBarShift]: sessionState.sidebar.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => sessionState.handleOpenSideBar()}
            edge="start"
            className={clsx(classes.menuButton, sessionState.sidebar.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
              Beerstores (QueSale)
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => (event.target.value.length === 0) ? handlerSearchInput(event.target.value) : null}
              onKeyPress={
                (event) => (event.key === 'Enter' && event.target.value.length !== 0) ? handlerSearchInput(event.target.value) : null
              }
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default Header
