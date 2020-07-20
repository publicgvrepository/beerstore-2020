import React from 'react'
import { beerStoresReducer,
  initialBeerStoreState,
  FETCH_BEERSTORES,
  FETCH_BEERSTORES_FULFILLED,
  FETCH_BEERSTORES_REJECTED }
   from '../reducers/beerStoresReducer'
import axios from 'axios'


export const BeerStoreContext = React.createContext()


const BeerStoreProvider = ({children}) => {

  const url = 'data/data-beerstore.json'

  // const { beerstores, isLoading, error } = useFetchData('')

  const [beerStoresState , dispatch] = React.useReducer(beerStoresReducer, initialBeerStoreState)

  function filterData(data, aFilter){
    if ((aFilter != null) && (aFilter.length >= 0))
     return data.filter((l)=>l.nombre.toLowerCase().includes(aFilter.toLowerCase()));
    else
     return data;
  }

  const fetchBeerstore = aFilter => {
    console.log("Filtering FrontEnd side...")
    dispatch({type: FETCH_BEERSTORES})
    const catchedData = sessionStorage.getItem('myData')
    setTimeout(() => {
        dispatch({type: FETCH_BEERSTORES_FULFILLED, payload:filterData(JSON.parse(catchedData), aFilter)})
    }, 1500)
  }

  React.useEffect(() => {
    console.log('Simulating fetching from API...')
    const fetchInitialBeerstore = () => {
      dispatch({type: FETCH_BEERSTORES})
      axios.get(url)
        .then(response => {
          setTimeout(() => {
            dispatch({type: FETCH_BEERSTORES_FULFILLED, payload:response.data})
            sessionStorage.setItem('myData', JSON.stringify(response.data));
          }, 1500)
        })
        .catch(err => {
          dispatch({type: FETCH_BEERSTORES_REJECTED, payload:err})
        })
      }
    fetchInitialBeerstore()
  },[])

  return(
    <BeerStoreContext.Provider
      value={{
        beerStores: beerStoresState.beerStores,
        isLoading: beerStoresState.isLoading,
        error: beerStoresState.error,
        getBeerStore: fetchBeerstore
      }}>
      {children}
    </BeerStoreContext.Provider>
  )
}

export default BeerStoreProvider