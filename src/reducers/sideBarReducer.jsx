export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const SET_FILTER_SIDEBAR = 'SET_FILTER_SIDEBAR'
export const SET_SELECTED_SIDEBAR = 'SET_SELECTED_SIDEBAR'


export const initialSidebarState = {
  sidebar:{
    open:false,
    selected: null,
  },
  filterCriteria:null
}

export const sideBarReducer = (
  state = initialSidebarState,
  action
) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sidebar:{ ...state.sidebar, open:true}
      }
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        sidebar:{ ...state.sidebar, open:false}
      }
    case 'SET_FILTER_SIDEBAR':
      return {
        ...state,
        sidebar:{ ...state.sidebar, selected:null},
        filterCriteria: action.payload
      }
    case 'SET_SELECTED_SIDEBAR':
      return {
        ...state,
        sidebar:{ ...state.sidebar, selected:action.payload},
      }
    default:
      return state
  }
}
