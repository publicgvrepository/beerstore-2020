
export const initialStateMap = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
    mapCenter: [-38.9524157,-68.059778], //nqn - san martin's monument
    zoomLevel: 10,
    zoomMax: 17,
    size: 'county'
  }

export function mapReducer(state, action) {
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
