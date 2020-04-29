//submit clicks
function redirectToSearch() {
  // window.location.href = "search.html";  
  window.location.href = "index.html"; //updated to same page. Will add\remove div's rather than go through multiple pages.

}

//parallax initialization
$(document).ready(function () {
  $('.parallax').parallax();
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('input#input_text, textarea#textarea2').characterCounter();
});

// input - reg

// $(document).ready(function() {
//   M.updateTextFields();
// });

// //  init with char count 
// $(document).ready(function() {
//   $('input#input_text, textarea#textarea2').characterCounter();
// });

//parallax method
// var instance = M.Parallax.getInstance(elem);

//select button materialize
// $(document).ready(function(){
//   $('select').formSelect();
// });

/* ------------------GOOGLE MAPS API-------------------*/

var x = document.getElementById("map1");
var gMapsAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&type=restaurant&key=&opennow"
var userInput1 = document.getElementById('input_text');
var userInput = "burger";
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var nearbyLocations = [];
var myLatitude;
var myLongitude;
var submitBtn = document.getElementById('SubmitFood');

var location0;
var location1;
var location2;
var location3;
var location4;

var locationName0;
var locationName1;
var locationName2;
var locationName3;
var locationName4;

var marker0;
var marker1;
var marker2;
var marker3;
var marker4;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  myLatitude = position.coords.latitude;
  myLongitude = position.coords.longitude;

  setupAPI(myLatitude, myLongitude);
}

var setupAPI = function (userLat, userLon) {

  gMapsAPI += ("&keyword=" + userInput + "&location=" + userLat + "," + userLon);

  FoodNearMe(gMapsAPI);

  //Remove parameters from the API call for search history clicks
  //gMapsAPI = gMapsAPI.split('&keyword')[0];
}

var FoodNearMe = function (apiString) {
  fetch(proxyurl + apiString).then(function (response) {
    response.json().then(function (JSONresponse) {

      console.log(apiString);
      //console.log(JSONresponse.results[0].geometry.location.lat);
      //console.log(JSONresponse.results[0].geometry.location.lng);

      for (i = 0; i < 5; i++) {

        nearbyLocations.push(
          JSONresponse.results[i].name,
          JSONresponse.results[i].geometry.location.lat,
          JSONresponse.results[i].geometry.location.lng);
        //console.log(nearbyLocations);
      }

      location0 = {
        lat: this.nearbyLocations[1],
        lng: this.nearbyLocations[2]
      };
      location1 = {
        lat: this.nearbyLocations[4],
        lng: this.nearbyLocations[5]
      };
      location2 = {
        lat: this.nearbyLocations[7],
        lng: this.nearbyLocations[8]
      };
      location3 = {
        lat: this.nearbyLocations[10],
        lng: this.nearbyLocations[11]
      };
      location4 = {
        lat: this.nearbyLocations[13],
        lng: this.nearbyLocations[14]
      };

      locationName0 = this.nearbyLocations[0];
      locationName1 = nearbyLocations[3];
      locationName2 = nearbyLocations[6];
      locationName3 = nearbyLocations[9];
      locationName4 = nearbyLocations[12];

      // Create the script tag, set the appropriate attributes
      var script = document.createElement('script');
      script.defer = true;
      script.async = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=&callback=initMap';

      // Append the 'script' element to 'head'
      document.head.appendChild(script);
    })
  })
}
window.initMap = function () {

  var map = new google.maps.Map(
    document.getElementById('GoogleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(this.myLatitude, this.myLongitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP

    });


  this.marker0 = new google.maps.Marker({
    position: location0,
    map: map
  });

  var marker1 = new google.maps.Marker({
    position: location1,
    map: map
  });

  var marker2 = new google.maps.Marker({
    position: location2,
    map: map
  });

  var marker3 = new google.maps.Marker({
    position: location3,
    map: map
  });

  var marker4 = new google.maps.Marker({
    position: location4,
    map: map
  });


  var infowindow = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + this.locationName0 + '</p>'
  });

  this.marker0.addListener('click', function () {
    infowindow.open(map, marker0);
  });


  var infowindow1 = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + this.locationName1 + '</p>'
  });

  marker1.addListener('click', function () {
    infowindow1.open(map, marker1);
  });


  var infowindow2 = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + this.locationName2 + '</p>'
  });

  marker2.addListener('click', function () {
    infowindow2.open(map, marker2);
  });


  var infowindow3 = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + this.locationName3 + '</p>'
  });

  marker3.addListener('click', function () {
    infowindow3.open(map, marker3);
  });


  var infowindow4 = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + this.locationName4 + '</p>'
  });

  marker4.addListener('click', function () {
    infowindow4.open(map, marker4);
  });

  var latLng = marker3.getPosition(); // returns LatLng object
map.setCenter(latLng); // setCenter takes a LatLng object

};

submitBtn.addEventListener('click', getLocation);
