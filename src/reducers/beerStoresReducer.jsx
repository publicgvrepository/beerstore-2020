export const FETCH_BEERSTORES = 'FETCH_BEERSTORES'
export const FETCH_BEERSTORES_FULFILLED = 'FETCH_BEERSTORES_FULFILLED'
export const FETCH_BEERSTORES_REJECTED = 'FETCH_BEERSTORES_REJECTED'
export const FETCH_FILTER_BEERSTORES_FULFILLED = 'FETCH_FILTER_BEERSTORES_FULFILLED'
export const SET_NEW_BEERSTORES_GEOM = 'SET_NEW_BEERSTORES_GEOM'
export const SET_NEW_BEERSTORES = 'SET_NEW_BEERSTORES'

export const initialBeerStoreState = {
    beerStores: [],
    isLoading:false,
    error: null,
    newBeerStore: ''
}

export const beerStoresReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BEERSTORES':
      return {
        ...state,
        isLoading:true
      }
    case 'FETCH_BEERSTORES_FULFILLED':
      return {
        ...state,
        beerStores: action.payload,
        isLoading:false,
        newBeerStore:''
      }
    case 'FETCH_BEERSTORES_REJECTED':
      return {
        ...state,
        isLoading:false,
        error: action.payload
      }
    case 'SET_NEW_BEERSTORES_GEOM':
      return {
        ...state,
        newBeerStore: action.payload
      }
    case 'SET_NEW_BEERSTORES':
      return {
        state: action.payload
      }
    default:
      return state
  }
}
