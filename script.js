// ktrnthsnr's section 

//submit clicks
function redirectOnClick() {     
  // window.location.href = "search.html";  
  window.location.href = "index.html";   //updated to same page. Will add\remove div's rather than go through multiple pages.
}

//parallax initialization
  $(document).ready(function(){
    $('.parallax').parallax();
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('input#input_text, textarea#textarea2').characterCounter();
  });

  // Drkeck's food menu fetch Javascript section (see scriptA.js)

  //[kt] spoonacular token referenced from a config.js file

  var myKey = theKey.apiKey;      //update to 'myKey' variable below
  console.log(myKey);

  /* ------------------[Alex] Spoonacular API ------------------ */

  var listId = 0
  var listFooditems = {};
  var searchItems = document.querySelector('#food-search');
  var searchHistory = document.querySelector('#search-history');
  var searchResultsHome = document.querySelector('#results-at-home');
  // var key =  '<replaced with token, see config.js>';   //replace API key with token. done.

  
  var saveSearch = function(event) {
      event.preventDefault();
      var userFoodItem = document.querySelector('#Food').value;
      userInput = userFoodItem.toLowerCase();
      logSearch(userFoodItem);
      foodApiSearch(userFoodItem);
  }

  var logSearch = function (food) {
      for (var i = 0; i < 4; i++) {
          if (food === listFooditems[i]) {
              return
          }
      }
      if (typeof listFooditems[listId] === "undefined") {
          var listItem = document.createElement('a');
          listItem.classList = 'collection-item';
          listItem.textContent = food;
          listItem.setAttribute("id", listId);
          listFooditems[listId] = food;
          searchHistory.appendChild(listItem);
      } else {
          listFooditems[listId] = food;
          var listItemText = document.getElementById(listId);
          listItemText.textContent = food;
      }
      listId++;
      if (listId > 4) {
          listId = 0
      }
      localStorage.setItem("food search", JSON.stringify(listFooditems));
  }

  var foodApiSearch = function(userSearch) {
      var apiUrl = 'https://api.spoonacular.com/recipes/search?query=';
      searchResultsHome.innerHTML = ""
      var dietsCheck = document.querySelector('#diets').value;
      var IntolCheck = document.querySelector('#intolerences').value;

      var parallaxDivsDelete = document.querySelector('#splashPG');
      parallaxDivsDelete.innerHTML = "";


      // fetch(apiUrl + userSearch + "&diet=" + dietsCheck + "&intolerances=" + IntolCheck + "&number=5" + "&" + key).then(function(response) {
      fetch(apiUrl + userSearch + "&diet=" + dietsCheck + "&intolerances=" + IntolCheck + "&number=1" + "&" + myKey).then(function(response) {    //change limit here, number=1
          if (response.ok) {
              response.json().then(function(data) {
                  var listEl = document.createElement("ul");
                  listEl.classList = "collapsible popout";
                  for (var i = 0; i < data.results.length; i++) {
                      var listItemEl = document.createElement("li");

                      var listTitle = document.createElement("div");
                      listTitle.classList = "collapsible-header center";
                      listTitle.innerHTML = "<i class='material-icons'>details</i>" + data.results[i].title;
                      
                      var listCont = document.createElement("div")
                      listCont.classList = "collapsible-body row";
                      listCont.setAttribute("id", "at-home-resp" + i);
                    
                      var listcontImg = document.createElement("img")
                      listcontImg.classList = "responsive-img col s12"
                      if (typeof data.results[i].image === "undefined") {
                          var imageLast = Math.max(1, i - 1)
                          listcontImg.setAttribute("src", "https://spoonacular.com/recipeImages/" + data.results[imageLast].image);

                      } else {
                          listcontImg.setAttribute("src", "https://spoonacular.com/recipeImages/" + data.results[i].image);
                      }

                      listcontImg.setAttribute("style", "height: 150px; object-fit: cover;");

                      var listContSpan = document.createElement("span");
                      listContSpan.setAttribute("id", "content-" + i);
                      listContSpan.setAttribute("style", "margin-bottom: 25px;" )
                      listContSpan.classList = "col s12"

                      var spacer = document.createElement("br");
                      var spacer2 = document.createElement("br");

                      var linkCont = document.createElement("a");
                      linkCont.innerHTML = "<i class='material-icons'>forward</i>";
                      linkCont.setAttribute("href", data.results[i].sourceUrl);
                      linkCont.classList = "btn-small waves-effect waves-light col s4 push-s4";

                      var recipeId = data.results[i].id;

                      listCont.appendChild(listcontImg);
                      listCont.appendChild(listContSpan);
                      listCont.appendChild(spacer);
                      listCont.appendChild(spacer2);
                      listCont.appendChild(linkCont);
                      listItemEl.appendChild(listTitle);
                      listItemEl.appendChild(listCont);
                      listEl.appendChild(listItemEl);
                      recipeSummary(recipeId, i);
                  }
                  searchResultsHome.appendChild(listEl);
                  $(document).ready(function(){
                      $('.collapsible').collapsible();
                    });
              })
          }
      });
      
  }

  var recipeSummary = function(recipeId, i) {
      var recipeSummaryApi = 'https://api.spoonacular.com/recipes/' + recipeId + '/summary' + "?" + myKey;
      fetch(recipeSummaryApi).then(function(response) {
          if(response.ok){
              response.json().then(function(data) {
                  var listContSpan = document.querySelector('#content-' + i);
                  listContSpan.innerHTML = data.summary;
              }
              )}
      })
  }

  var loadSearchHistory = function() {
      var tempListFooditems = JSON.parse(localStorage.getItem("food search"));
      if (!tempListFooditems) {
        listFooditems = {};
        return;
      } else {
        for (var i = 0; i < 4; i++) {
            var tempSearch = tempListFooditems[i];
            logSearch(tempSearch);
        }
      }
  }

  searchItems.addEventListener("click", saveSearch);
  $(searchHistory).on("click", "a", function(event) {
      event.preventDefault();
      var buttonEl = event.target.textContent;
      userInput = buttonEl
      foodApiSearch(buttonEl);
  })

  loadSearchHistory();

    $(document).ready(function(){
      $('.sidenav').sidenav();
      $('select').formSelect();
      $('input#input_text, textarea#textarea2').characterCounter();
    });




// ------------------ Pops08's location mapping Javascript section - Pops08 (see scriptJ.js) ----------- //

  // [kt]  google maps token
  var myKeyMaps = theKeyMaps.apiKeyMaps;
  console.log(theKeyMaps);

               /* ------------------ [Josh] GOOGLE MAPS API-------------------*/

  var x = document.getElementById("map1");
  var gMapsAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&type=restaurant&key=" + myKeyMaps + "&opennow";
    var userInput1 = document.getElementById('input_text');
  // var userInput = "burger";
  var userInput = "";
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  var nearbyLocations = [];
  var myLatitude;
  var myLongitude;
  var submitBtn = document.getElementById('food-search'); 

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

  // console.log(apiString);
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
  script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKeyMaps + "&callback=initMap";

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




