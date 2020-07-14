import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Map from './components/Map/Map'
import useFetchData from './hooks/useFetchData'
import { useSnackbar } from 'notistack'

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '&$selected': {
      backgroundColor: 'white'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flex: '1 1',
    order: '2',
    padding: theme.spacing(0.3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    background:'black',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  mapPane: {
    flex: '1',
    height: '100%',
  }
}));

function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const [selectedBeerStore, setselectedBeerStore] = React.useState(-1);

  const [search, setSearch] = React.useState('');

  const {data, isLoading, error} = useFetchData(search);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (isLoading){
      enqueueSnackbar('Loading...', {variant: 'info'})
    }
    else{
      closeSnackbar();
    }
  },[isLoading, enqueueSnackbar, closeSnackbar])

  React.useEffect(() => {
    if (error){
      if (!isLoading)
        enqueueSnackbar(error.toString(), {variant: 'error'})
    }
  },[error, isLoading, enqueueSnackbar])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const callbackSideBar = (childData) => {
    setselectedBeerStore(childData)
  }

  const callbackMap = (childData) => {
    setselectedBeerStore(childData)
  }

  const callbackHeader = (childData) => {
    setselectedBeerStore(-1)
    setSearch(childData)
  }


  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handlerSearchInput={callbackHeader}
      />
      <SideBar
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose}
        data={data}
        isLoading={isLoading}
        handleSelected={callbackSideBar}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div id="map-container" className={classes.mapPane}>
          <Map
            selected={selectedBeerStore}
            data={data}
            isLoading={isLoading}
            handleSelected={callbackMap}
          />
        </div>
      </main>
    </div>
  );
}

export default App;