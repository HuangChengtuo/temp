window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium';

import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
  geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
  navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
  homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
  sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
  animation: false, // 如果设置为false，将不会创建左下角动画小部件。
  timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
  fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
  scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
  shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
  // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
  infoBox: false, // 是否显示点击要素之后显示的信息
  sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
  requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
  fullscreenElement: document.body
});
viewer.imageryLayers.addImageryProvider(
  new Cesium.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  })
);
viewer.imageryLayers.addImageryProvider(
  new Cesium.UrlTemplateImageryProvider({
    url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
  })
);

viewer.entities.add({
  name: 'Red box with black outline',
  position: Cesium.Cartesian3.fromDegrees(120.09930431842805, 30.304465463397804, 0),
  box: {
    dimensions: new Cesium.Cartesian3(40.0, 100.0, 150.0),
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK
  }
})

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(120.09930431842805, 30.304465463397804, 4000),
  duration: 0
})

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction(e => {
  const pick = viewer.scene.pick(e.position);
  console.log(pick)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)