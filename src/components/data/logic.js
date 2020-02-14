import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import FeatureLayer from "esri/layers/FeatureLayer";
import esriConfig from "esri/config";
import Map from "esri/Map";

// const noop = () => {};

const url =
  "https://services8.arcgis.com/o9xiVBMM7LVPq4Xx/ArcGIS/rest/services/spatial_selection_50km/FeatureServer/0";
export const fl = new FeatureLayer(url);
export const map = new Map({
  basemap: "dark-gray",
  layers: [fl]
});


esriConfig.portalUrl = "https://sagi.maps.arcgis.com/";



const webmap = new WebMap({
  portalItem: {
    id: "83880c81090d47c88ae2661114297169"
  }
});




export const view = new MapView({
  map: webmap,
  container: "viewDiv",
  center: [4.31, 39.87],
  // zoom: 6
});



export const initialize = container => {
  view.container = container;
  view;
  return () => {
    view.container = null;
  };
};




