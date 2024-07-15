import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import china from './china.json'

const map = L.map('map').setView([30.304465463397804, 120.09930431842805], 13).on('click', e => {
  console.log('map', e, e.latlng.lat + ',' + e.latlng.lng)
});

L.tileLayer('http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d20c9064d1323a872b5fca1680f552e6')
  .addTo(map);
L.tileLayer('http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d20c9064d1323a872b5fca1680f552e6')
  .addTo(map);

const marker = L.marker([30.304465463397804, 120.09930431842805]).addTo(map).on('click', e => {
  console.log('marker', e)
})

const circle = L.circle([30.301788475505692, 120.10216355323793], {
  color: 'red',
  fillColor: 'red',
  fillOpacity: 0.5,
  radius: 100
}).addTo(map);

var polygon = L.polygon([
  [30.304465463397804, 120.09930431842805],
  [30.30264067335389, 120.09382188320161],
  [30.302006157182188, 120.10126769542696],
  [30.30486376330757, 120.10683596134187]
]).addTo(map);

const geoJSON = L.geoJSON(china as any, {
  style: { fillOpacity: 0 }
}).addTo(map)
geoJSON.eachLayer((layer) => {
  // console.log(layer.feature.properties.name)
  layer.bindPopup(layer.feature.properties.name);
})