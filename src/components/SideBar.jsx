import React  from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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


const SideBar = props => {

  const beerStores = props.data;
  const isLoading = props.isLoading;
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const theme = useTheme();

  const drawerWidth = props.drawerWidth;

  const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      background:'black',
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      colorPrimary: 'white',
      background:'black',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerList:{
      background:'black'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    listItem:{
      color:'white',
    },
    listItemSelected: {
      background : '#1d436a !important',
      color: 'white',
      backgroundColor: "#1d436a !important",
    },
    iconList:{
      color:'white'
    },
    spiner: {
      display: 'flex',
      flexDirection: 'column',     /* Rotate Axis to Vertical */
      justifyContent: 'center',    /* Group Children in Center */
      alignItems: 'center',        /* Group Children in Center (+axis) */
    },
  }));

  const classes = useStyles()

  let content = <div className={classes.spiner}><CircularProgress color="secondary" /></div>

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton color="secondary" onClick={props.handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List className={classes.drawerList}>
        { (isLoading) ? content :
          beerStores.map((item, index) => (
            <ListItem
              button
              onClick={() => {
                props.handleSelected(index)
                setSelectedIndex(index)
              }}
              key={index}
              className={selectedIndex === index ? classes.listItemSelected : classes.listItem}
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