import mapboxgl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import data from './track.json'
window.key = 'd20c9064d1323a872b5fca1680f552e6'

const map = new mapboxgl.Map({
  container: document.getElementById('map'),
  style: {
    "version": 8,
    "sources": {
      "tdt-vec": {
        "type": "raster",
        "tiles": [`http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${window.key}`],
        "tileSize": 256
      },
      "tdt-cva": {
        "type": "raster",
        "tiles": [`https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${window.key}`],
        "tileSize": 256
      },
    },
    "layers": [
      {
        "id": 'tdt-tiles-layer',
        "type": "raster",
        "source": "tdt-vec",
      },
      {
        "id": "tdt-cva-layer",
        "type": "raster",
        "source": "tdt-cva",
      },
    ]
  },
  center: {
    "lng": 120.1430140552464,
    "lat": 30.247628657287564
  },
  zoom: 13
});

let index = 0

map.on('click', e => {
  console.log(e.lngLat)
})

const point = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Point',
        'coordinates': [120.155023, 30.248279]
      }
    }
  ]
};

map.on('load', () => {
  map.addLayer({
    id: 'track',
    type: 'line',
    source: { type: 'geojson', data: data as any },
    paint: {
      'line-color': '#ff0000',
      'line-width': 5,
      'line-opacity': 0.75
    }
  });
  map.addSource('point', {
    'type': 'geojson',
    'data': point as any
  });

  map.addLayer({
    'id': 'point',
    'source': 'point',
    'type': 'circle',
    paint: {
      "circle-stroke-width": 2,
      'circle-color': '#ffffff'
    }
  });
  startRun()
})

function startRun(unix?: number) {
  const arr = data.geometry.coordinates
  index = index === arr.length - 1 ? 0 : index + 1
  point.features[0].geometry.coordinates = arr[index]
  map.getSource('point').setData(point);
  requestAnimationFrame(startRun)
}
