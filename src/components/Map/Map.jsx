import React from 'react'
import { Map as MapLeaflet, TileLayer } from 'react-leaflet'
import Marker from '../Marker/Marker'
import './Map.css'

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

  const [markers, setMakers] = React.useState([])

  const [mapData, mapDispatch] = React.useReducer(mapReducer, initialStateMap)

  const selectedMarker = props.selected

  const isLoading = props.isLoading

  React.useEffect(() => {
    setMakers(props.data)
  },[props.data])

  React.useEffect(() => {
    if ((props.data.length > 0) && (selectedMarker !== -1)){
      let coordinates = [props.data[selectedMarker].geom.coordinates[1],props.data[selectedMarker].geom.coordinates[0]]
      mapDispatch({type: 'CENTER_ON', payload: coordinates})
      mapDispatch({type: 'ZOOM_IN'})
      mapDispatch({type: 'ZOOM_IN'})
      mapDispatch({type: 'ZOOM_IN'})
    }
  },[selectedMarker, props.data])

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
          (isLoading) ?
          <React.Fragment />
          :
          markers.map((item, index) => (
            <Marker
              key={index}
              data={item}
              selected={selectedMarker === index}
            />
          ))
        }
      </MapLeaflet>
    </React.Fragment>
  );
}

export default Map;
