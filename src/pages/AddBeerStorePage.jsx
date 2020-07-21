import React from 'react'
import { SessionContext }  from '../context/SessionContext'
import { StyleContext } from '../context/StyleContext'
import { BeerStoreContext } from '../context/BeerStoreContext'
import SideBarAddBeerStore from '../components/SideBarAdd/SideBarAddBeerStore'
import clsx from 'clsx'
import { Map as MapLeaflet, Marker as MarkerLeaflet, TileLayer } from 'react-leaflet'
import { mapReducer, initialStateMap } from '../components/Map/mapReducer'

const AddBeerStorePage = props => {

  const { classes } = React.useContext(StyleContext)
  const sessionState = React.useContext(SessionContext)
  const [markerPosition] = React.useState([-38.9524157,-68.059778])
  const [mapData] = React.useReducer(mapReducer, initialStateMap)
  const beerStoreState = React.useContext(BeerStoreContext)


  const extractGeoPos = eventMarker => {
    return [eventMarker.target._latlng.lat,eventMarker.target._latlng.lng]
  }
  const handleMakerDragged = event => {
    beerStoreState.storeNewBeerStoreGeom(extractGeoPos(event))
  }

  return (
    <React.Fragment>
      <SideBarAddBeerStore />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: sessionState.sidebar.open,
          })}
          >
          <div className={classes.drawerHeader} />
            <MapLeaflet center={mapData.mapCenter}
            zoom={mapData.zoomLevel}
            maxZoom={mapData.zoomMax}
            animate={true}
            zoomControl={false}
          >
          <TileLayer attribution={mapData.attribution} url={mapData.url} />
            <MarkerLeaflet
              position={markerPosition}
              draggable={true}
              onDragend={(e) => handleMakerDragged(e)}>
            </MarkerLeaflet>
          </MapLeaflet>
      </main>
    </React.Fragment>
  )
}

export default AddBeerStorePage