window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium';

import { Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Viewer("cesiumContainer", {
});
