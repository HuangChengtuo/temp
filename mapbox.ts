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
  center: [120.1430140552464, 30.247628657287564],
  zoom: 13
});

let index = 0
let model
let modelIndex = 0

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

const tb = (window.tb = new Threebox(
  map,
  map.getCanvas().getContext('webgl'),
  {
    defaultLights: true
  }
));


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
  map.addLayer({
    id: 'custom-threebox-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function() {
      // Creative Commons License attribution:  Metlife Building model by https://sketchfab.com/NanoRay
      // https://sketchfab.com/3d-models/metlife-building-32d3a4a1810a4d64abb9547bb661f7f3
      const scale = 3.2;
      const options = {
        obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
        type: 'gltf',
        scale: { x: scale, y: scale, z: 2.7 },
        units: 'meters',
        rotation: { x: 90, y: -90, z: 0 }
      };

      tb.loadObj(options, (temp) => {
        model = temp
        model.setCoords([120.1430140552464, 30.247628657287564]);
        model.setRotation({ x: 0, y: 0, z: 241 });
        tb.add(model);
      });
    },
    render: function() {
      tb.update();
    }
  });
})

function startRun(unix?: number) {
  const arr = data.geometry.coordinates
  index = index === arr.length - 1 ? 0 : index + 1
  point.features[0].geometry.coordinates = arr[index]
  map.getSource('point').setData(point);
  if (model) {
    modelIndex = modelIndex === arr.length - 1 ? 0 : modelIndex + 1
    model?.setCoords?.(arr[modelIndex]);
  }

  requestAnimationFrame(startRun)
}
