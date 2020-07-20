import React from 'react'
import { sideBarReducer,
  initialSidebarState,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SET_FILTER_SIDEBAR,
  SET_SELECTED_SIDEBAR
} from '../reducers/sideBarReducer'

export const SessionContext = React.createContext();


const SessionProvider = ({children}) => {

  const [sidebarState, dispatch] = React.useReducer(sideBarReducer, initialSidebarState)

  const handleCloseSideBar = () => {
    dispatch({type:CLOSE_SIDEBAR})
  }

  const handleOpenSideBar = () => {
    dispatch({type:OPEN_SIDEBAR})
  }

  const handleFilterSideBar = aFilter => {
    dispatch({type:SET_FILTER_SIDEBAR, payload:aFilter})
  }

  const handleSelectedSideBar = aSelected => {
    dispatch({type:SET_SELECTED_SIDEBAR, payload:aSelected})
  }

  return(
    <SessionContext.Provider
      value={{
        sidebar:sidebarState.sidebar,
        filter:sidebarState.filterCriteria,
        handleCloseSideBar,
        handleOpenSideBar,
        handleFilterSideBar,
        handleSelectedSideBar
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider