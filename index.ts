import mapboxgl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import china from './china.json'
const map = new mapboxgl.Map({
  container: document.getElementById('map'),
  style: {
    "version": 8,
    "sources": {},
    "layers": []
  }
})

map.on('load', () => {
  map.addSource('bound-source', {
    type: 'geojson',
    data: china
  })
  map.addLayer({
    id: 'areas-line',
    type: 'line',
    source: 'bound-source',
    paint: {
      'line-color': '#000',
      'line-width': 2
    }
  })
})