require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/geometry/Polyline",
  "esri/layers/GraphicsLayer",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol"
], function(esriConfig, Map, MapView, Graphic, Point, Polygon, Polyline, GraphicsLayer, BasemapGallery, Locate, Search, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol) {
  esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurIMrpomeP09wA2mwDUzsv0qeG0ISCTpeTdFxzbJ-cyUauMC57EbnsWKVEefpRXnMiGrcXI8uPFtXbXTg2ji6sArT6R3SJAig3OM8Lzga26cqaxk8AxkOHrjTm9r-TQeuNHOu0bcrPnWC23w_4kB0GpfStwIImUvd3GDp4LZ4RSIjvlx30GE3n4EEu8qDK22R6k_mqP_HtnOMp02bV3JenFSMMaoeVsf4YcD-tH1zZ8sfAT1_iHCSbfhe";

  const map = new Map({
    basemap: "arcgis-imagery"
  });

  const view = new MapView({
    map: map,
    zoom: 14,
    center: [-89.3975, 43.0760], // Adjusted to show all elements
    container: "viewDiv"
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // Create the Search widget
  const searchWidget = new Search({
    view: view
  });
  
  view.ui.add(searchWidget, {
    position: "top-right",
    index: 2
  });
      
  // Create the BasemapGallery
  const basemapGallery = new BasemapGallery({
    view: view,
    source: {
      portal: {
        url: "https://www.arcgis.com"
      }
    }
  });

  view.ui.add(basemapGallery, {
    position: "top-right"
  });

  // Create the Locate widget
  const locateBtn = new Locate({
    view: view
  });

  view.ui.add(locateBtn, {
    position: "top-left"
  });

  // Create a diamond symbol for Science Hall
  const diamondSymbol = new SimpleMarkerSymbol({
    style: "diamond",
    size: 20,
    color: [0, 0, 255],  // Blue color
    outline: {
      color: [255, 255, 255],
      width: 2
    }
  });

  // Create the point graphic for Science Hall
  const scienceHallPoint = new Graphic({
    geometry: new Point({
      longitude: -89.40105376328454,
      latitude: 43.07591654695142
    }),
    symbol: diamondSymbol,
    attributes: {
      Name: "Science Hall, UW Madison",
      Description: "A historic building at the University of Wisconsin-Madison"
    },
    popupTemplate: {
      title: "{Name}",
      content: "{Description}"
    }
  });

  // Add the Science Hall point to the graphics layer
  graphicsLayer.add(scienceHallPoint);

  // Create a polygon for the Wisconsin State Capitol
  const capitolPolygon = new Polygon({
    rings: [
      [
        [-89.3850306137829, 43.07457271113106],
        [-89.38504738980572, 43.07491583073097],
        [-89.38456661142177, 43.075012180802766],
        [-89.3844481180974, 43.07535585276849],
        [-89.38393232362661, 43.07535585276849],
        [-89.38377200912893, 43.07499945217444],
        [-89.38337470798253, 43.07492053461973],
        [-89.38338516327585, 43.07454121979354],
        [-89.38379640481337, 43.07444702715735],
        [-89.38394974911549, 43.074093167041376],
        [-89.38443417770628, 43.074131353483175],
        [-89.38453176044402, 43.074459755900435],
        [-89.3850306137829, 43.07457271113106]
      ]
    ]
  });

  const polygonSymbol = new SimpleFillSymbol({
    color: [227, 139, 79, 0.5],  // Orange color with transparency
    outline: {
      color: [255, 0, 0],  // Red outline
      width: 2
    }
  });

  const capitolGraphic = new Graphic({
    geometry: capitolPolygon,
    symbol: polygonSymbol,
    attributes: {
      Name: "Wisconsin State Capitol",
      Description: "The state capitol building of Wisconsin"
    },
    popupTemplate: {
      title: "{Name}",
      content: "{Description}"
    }
  });

  // Add the Capitol polygon to the graphics layer
  graphicsLayer.add(capitolGraphic);

  // Create a polyline for part of Observatory Drive
  const observatoryDrivePolyline = new Polyline({
    paths: [
      [
        [-89.40335350206877, 43.077273109728395],
        [-89.40489623886448, 43.077556380725646],
        [-89.40679911290006, 43.07762745594417],
        [-89.40946962328343, 43.078132877260856],
        [-89.41071297865584, 43.078717265480876],
        [-89.4114698036969, 43.07863039731557],
        [-89.41467009144374, 43.07846455775215]
      ]
    ]
  });

  const polylineSymbol = new SimpleLineSymbol({
    color: [0, 255, 0],  // Green color
    width: 3
  });

  const observatoryDriveGraphic = new Graphic({
    geometry: observatoryDrivePolyline,
    symbol: polylineSymbol,
    attributes: {
      Name: "Lakeshore Path Segment",
      Description: "A scenic walk along Lake Mendota"
    },
    popupTemplate: {
      title: "{Name}",
      content: "{Description}"
    }
  });

  // Add the Observatory Drive polyline to the graphics layer
  graphicsLayer.add(observatoryDriveGraphic);

  // Initial geolocation code remains unchanged
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        view.center = [lon, lat];
      },
      error => {
        console.error("Error getting location:", error);
        // We're already centered on Madison, so no need for a fallback
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    // We're already centered on Madison, so no need for a fallback
  }
});