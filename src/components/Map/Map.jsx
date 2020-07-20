import React from 'react'
import { Map as MapLeaflet, TileLayer } from 'react-leaflet'
import Marker from '../Marker/Marker'
import './Map.css'
import { BeerStoreContext } from '../../context/BeerStoreContext'
import { SessionContext }  from '../../context/SessionContext'


const initialStateMap = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
  mapCenter: [-38.9524157,-68.059778], //nqn - san martin's monument
  zoomLevel: 10,
  zoomMax: 17,
  size: 'county'
}

function mapReducer(state, action) {
  switch (action.type) {
    case 'ZOOM_IN':
      return {
        ...state,
        zoomLevel: ++state.zoomLevel
      }
    case 'ZOOM_OUT':
      return {
        ...state,
        zoomLevel: --state.zoomLevel
      }
    case 'CENTER_ON':
      return {
        ...state,
        mapCenter: action.payload
      }
    default:
      return state;
  }
}

const Map = props => {

  const [mapData, mapDispatch] = React.useReducer(mapReducer, initialStateMap)
  const beerStoreState = React.useContext(BeerStoreContext)
  const sessionState = React.useContext(SessionContext)

  React.useEffect(() => {
    if ((beerStoreState.beerStores.length > 0) && (sessionState.sidebar.selected !== null)){
      let coordinates = [beerStoreState.beerStores[sessionState.sidebar.selected].geom.coordinates[1],beerStoreState.beerStores[sessionState.sidebar.selected].geom.coordinates[0]]
      mapDispatch({type: 'CENTER_ON', payload: coordinates})
      mapDispatch({type: 'ZOOM_IN'})
      mapDispatch({type: 'ZOOM_IN'})
      mapDispatch({type: 'ZOOM_IN'})
    }
  },[sessionState.sidebar.selected, beerStoreState.beerStores])

  return (
    <React.Fragment>
      <MapLeaflet center={mapData.mapCenter}
        zoom={mapData.zoomLevel}
        maxZoom={mapData.zoomMax}
        animate={true}
        zoomControl={false}
      >
      <TileLayer attribution={mapData.attribution} url={mapData.url} />
        {
          (beerStoreState.isLoading) ?
          <React.Fragment />
          :
          beerStoreState.beerStores.map((item, index) => (
            <Marker
              key={index}
              data={item}
              selected={sessionState.sidebar.selected === index}
            />
          ))
        }
      </MapLeaflet>
    </React.Fragment>
  );
}

export default Map;
