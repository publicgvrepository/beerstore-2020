import React  from 'react'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { SessionContext }  from '../../context/SessionContext'
import { StyleContext } from '../../context/StyleContext'
import { BeerStoreContext } from '../../context/BeerStoreContext'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'
import './sideBarAddForm.css'


const SideBar = props => {

  const sessionState = React.useContext(SessionContext);

  const theme = useTheme();

  const { classes } = React.useContext(StyleContext);

  const { enqueueSnackbar } = useSnackbar()

  const beerStoreState = React.useContext(BeerStoreContext)

  const [geom, setGeom] = React.useState('')

  const [name, setName] = React.useState('')

  const handleInputBSName = beerStoreName => {
    setName(beerStoreName)
  }

  const clearForm = () => {
    setGeom('')
    setName('')
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!geom){
      enqueueSnackbar("Drag marker on map to set geom", {variant: 'warning'})
    }
    if (!name){
      enqueueSnackbar("Complete beerstore name", {variant: 'warning'})
    }
    if ((geom !== '') && (name !== '')){
      beerStoreState.postNewBeerStore(name, geom)
      enqueueSnackbar("Beerstore charged", {variant: 'success'})
      clearForm()
    }
  }

  React.useEffect(() => {
    setGeom((beerStoreState.newBeerStore))
  },[beerStoreState.newBeerStore])


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
            <NavLink to="/">
              <button className={classes.btnNav} type="button">Back to list</button>
            </NavLink>
        </div>
      </React.Fragment>
      <Divider />
        <React.Fragment>
        <form onSubmit={(e) => e.preventDefault} className="form-box">
          <ul className="wrapper">
            <li className="form-row">
              <label>Beer Store Name</label>
              <input type="text" value={name} onChange={e => handleInputBSName(e.target.value)} />
            </li>
            <li className="form-row">
              <label>GeoPos</label>
              <input type="text" id="townborn" placeholder="Drag marker on map!" disabled value={geom}/>
            </li>
            <li className="form-row-button">
            <NavLink to="/">
              <button className="cancel-button" type="button">Cancel</button>
            </NavLink>
              <button className="submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
            </li>
          </ul>
        </form>
        </React.Fragment>
      <Divider />
    </Drawer>
  )
}

export default SideBar