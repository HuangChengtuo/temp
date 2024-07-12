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
        "tiles": [`http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${window.key}`],
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
  }
});

const images = {
  zhuren: 'https://pic.zhangshichun.top/pic/20221129-12.png',
  bao: 'https://pic.zhangshichun.top/pic/20221129-10.png',
  nan: 'https://pic.zhangshichun.top/pic/20221129-11.png'
}
// const loadImages = async (imgs) => {
//   await Promise.all(
//     Object.entries(imgs).map(
//       ([key, url]) =>
//         new Promise((resolve) => {
//           map.loadImage(url, (error, res) => {
//             if (error) throw error;
//             map.addImage(key, res);
//             resolve(res);
//           });
//       }),
//     ),
//   );
// };

const loadImages = async (imgs) => {
  await Promise.all(
    Object.entries(images).map(async ([key, url]) => {
      const res = await map.loadImage(url)
      console.log('hct', res)
      map.addImage(key, res.data);
    })
  )
}

async function fn() {
  await loadImages(images)
  // 添加位置资源
  map.addSource('boys-source', {
    type: 'geojson',
    data: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "德育处主任",
            "icon": "zhuren"
          },
          "geometry": {
            "coordinates": [
              114.34495622042738,
              30.51879704948628
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "战场小包",
            "icon": "bao"
          },
          "geometry": {
            "coordinates": [
              114.46248908403493,
              30.52385942598788
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "南方者",
            "icon": "nan"
          },
          "geometry": {
            "coordinates": [
              114.4188340204089,
              30.481906063384173
            ],
            "type": "Point"
          }
        }
      ]
    }
  })
  // 添加ICON图层
  map.addLayer({
    id: 'boys-icon-layer',
    type: 'symbol',
    source: 'boys-source',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 0.2,
      'icon-anchor': 'center',
      'icon-rotation-alignment': 'viewport',
      'icon-allow-overlap': true
    }
  })
  // 添加名字图层
  map.addLayer({
    id: 'boys-name-layer',
    "type": "symbol",
    source: 'boys-source',
    "layout": {
      "text-field": '{name}',
      "text-size": 14,
      'text-offset': [0, 2.4], // 名字要设置便宜，避免被头像挡住
      'text-allow-overlap': true
    },
    "paint": {
      "text-color": "white",
    },
  })
}

fn()
