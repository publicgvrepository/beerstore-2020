export const FETCH_BEERSTORES = 'FETCH_BEERSTORES'
export const FETCH_BEERSTORES_FULFILLED = 'FETCH_BEERSTORES_FULFILLED'
export const FETCH_BEERSTORES_REJECTED = 'FETCH_BEERSTORES_REJECTED'
export const FETCH_FILTER_BEERSTORES_FULFILLED = 'FETCH_FILTER_BEERSTORES_FULFILLED'


export const initialBeerStoreState = {
    beerStores: [],
    isLoading:false,
    error: null
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
        isLoading:false
      }
    case 'FETCH_BEERSTORES_REJECTED':
      return {
        ...state,
        isLoading:false,
        error: action.payload
      }
    default:
      return state
  }
}
