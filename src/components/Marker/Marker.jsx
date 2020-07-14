import React from 'react'
import { Marker as MarkerLeaflet, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import './Marker.css'

const Marker = props => {

  const colores = ['black', 'red', 'darkred', 'gray', 'blue', 'lightgreen', 'white', 'beige'];

  const iconos = ['<i class="material-icons">visibility_off</i>', '<i class="material-icons">stars</i>'];

  const icono = divIcon({
    className: '',
    popupAnchor:[5,-30],
    iconAnchor: [0, 0],
    html: '<div><div class="awesome-marker-icon-' +
      colores[0] + ' awesome-marker leaflet-clickable leaflet-zoom-animated"' +
      ' style="opacity: 0.7; filter: alpha(opacity=50); margin-left: -13px; margin-top: -37px; width: 35px; height: 45px;">' +
      iconos[0] + '</div></div>',
  });

  const icono_focus = divIcon({
    className: '',
    popupAnchor:[5,-30],
    iconAnchor: [0, 0],
    html: '<div><div class="awesome-marker-icon-' +
      colores[1] + ' awesome-marker leaflet-clickable leaflet-zoom-animated"' +
      ' style="margin-left: -13px; margin-top: -37px; width: 35px; height: 45px;">' +
      iconos[1] + '</div></div>',
  });

  return (
    <MarkerLeaflet
      position={[props.data.geom.coordinates[1],props.data.geom.coordinates[0]]}
      icon={props.selected ? icono_focus : icono}
    >
      <Popup closeButton={true}>
        <div className="card">
          <div className="card-header">{props.data.nombre}</div>
          <div className="card-main">
            <i className="material-icons">local_bar</i>
            <div className="main-description">
              {props.data.direccion}, <b>{props.data.localidad.nombre}</b>
            </div>
          </div>
        </div>
      </Popup>
    </MarkerLeaflet>
  );
}

export default Marker;