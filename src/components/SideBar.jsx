import React  from 'react'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocalBarIcon from '@material-ui/icons/LocalBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SessionContext }  from '../context/SessionContext'
import { StyleContext } from '../context/StyleContext'
import { BeerStoreContext } from '../context/BeerStoreContext'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'


const SideBar = props => {

  const sessionState = React.useContext(SessionContext);

  const beerStoreState = React.useContext(BeerStoreContext)

  const theme = useTheme();

  const { classes } = React.useContext(StyleContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (beerStoreState.isLoading){
      enqueueSnackbar('Loading...', {variant: 'info'})
    }
    else{
      if (beerStoreState.error){
        if (!beerStoreState.isLoading){
          enqueueSnackbar(beerStoreState.error.toString(), {variant: 'error'})
        }
      }
      if (!beerStoreState.isLoading && (beerStoreState.beerStores.length === 0)){
        closeSnackbar()
        enqueueSnackbar('No results...', {variant: 'warning'})
      }
      else
        closeSnackbar()
    }
  },[beerStoreState, enqueueSnackbar, closeSnackbar])

  const [prevFilter, setPrevFilter] = React.useState(null)

  React.useEffect(() => {
    if (sessionState.filter !== null){
      if (prevFilter !== sessionState.filter){
        setPrevFilter(sessionState.filter)
        beerStoreState.getBeerStore(sessionState.filter)
      }
    }
  },[prevFilter, sessionState.filter, beerStoreState])

  const handleSelectedItem = selected => {
    sessionState.handleSelectedSideBar(selected)
  }

  let content = <div className={classes.spiner}><CircularProgress color="secondary" /></div>


  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={sessionState.sidebar.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton color="secondary" onClick={() => sessionState.handleCloseSideBar()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <React.Fragment>
        <div className={classes.drawerCardList}>
            <NavLink to="/add-beerstore">
              <button className={classes.btnNav} type="button">Add Beerstore</button>
            </NavLink>
        </div>
      </React.Fragment>
      <Divider />
      <List className={classes.drawerList}>
        { (beerStoreState.isLoading) ? content :
          beerStoreState.beerStores.map((item, index) => (
            <ListItem
              button
              onClick={() => handleSelectedItem(index)}
              key={index}
              className={sessionState.sidebar.selected === index ? classes.listItemSelected : classes.listItem}
            >
              <ListItemIcon><LocalBarIcon className={classes.iconList}/></ListItemIcon>
              <ListItemText primary={item.nombre} />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  )
}

export default SideBar