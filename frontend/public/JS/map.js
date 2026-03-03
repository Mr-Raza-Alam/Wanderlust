// For map

//let mapToken =  process.env.MAP_TOKEN ;
//document.addEventListener("DOMContentLoaded", () => {
const mapDiv = document.getElementById('map');
const listing = JSON.parse(mapDiv.dataset.coordinates);

console.log(mapToken);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container : "map",// container ID
    // Choose from mapbox's core styles, or make your own style with Mapbox Studil
    style : "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom : 9,
    });
   // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({color : "red",})
        .setLngLat(listing.geometry.coordinates)// listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})//, className: 'my-class' so setPopum is funct.name
        .setHTML(`@<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`)
        .setMaxWidth("350px"))
        .addTo(map);
//});