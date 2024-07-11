import mapboxgl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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
        "tiles": [`http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${window.key}`],
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
  }
});
