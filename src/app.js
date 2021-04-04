/*
 * Copyright 2020 Google LLC

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *  https://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';

const googleMapsAPIKey = 'AIzaSyDyb3pXB7WcmefmKTEKWPg6M8XidPM3g_U';

loadJSAPI();

function runApp() {
  const map = initMap();
  const layerOptions = {
    id: 'scatter-plot',
    data: './station.json',
    getPosition: (d) => [parseFloat(d.longitude), parseFloat(d.latitude)],
    getRadius: (d) => parseInt(d.capacity),
    stroked: true,
    getFillColor: [255, 133, 27],
    getLineColor: [255, 38, 27],
    radiusMinPixels: 5,
    radiusMaxPixels: 50,
  };

  const scatterplotLayer = new ScatterplotLayer(layerOptions);
  const googleMapsOverlay = new GoogleMapsOverlay({
    layers: [scatterplotLayer],
  });
  googleMapsOverlay.setMap(map);
}

// const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
// const script = document.createElement('script');

// script.src = googleMapsAPIURI;
// script.defer = true;
// script.async = true;

// window.runApp = runApp;
// document.head.appendChild(script);

// const mapDiv = document.getElementById('map');
// return new google.maps.Map(mapDiv, mapOptions);
// loads the Maps JS API - see helper function below

// initialize the map and executes your code
// once the API has loaded

// Your code goes here

/* API and map loader helpers */
function loadJSAPI() {
  const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
  const script = document.createElement('script');

  script.src = googleMapsAPIURI;
  script.defer = true;
  script.async = true;

  window.runApp = runApp;
  document.head.appendChild(script);
}

function initMap() {
  const mapOptions = {
    center: { lat: 37.7, lng: -122.4 },
    zoom: 10,
    styles: mapStyle,
  };
  const mapDiv = document.getElementById('map');
  return new google.maps.Map(mapDiv, mapOptions);
}
