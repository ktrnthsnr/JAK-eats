// ktrnthsnr's section 

//parallax initialization
$(document).ready(function () {
    $('.parallax').parallax();
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('input#input_text, textarea#textarea2').characterCounter();
});

// Drkeck's food menu fetch Javascript section (see scriptA.js)

//[kt] spoonacular token referenced from a config.js file

var myKey = theKey.apiKey; //update to 'myKey' variable below
console.log(myKey);

/* ------------------[Alex] Spoonacular API ------------------ */

var listId = 0
var listFooditems = {};
var searchItems = document.querySelector('#food-search');
var searchHistory = document.querySelector('#search-history');
var searchResultsHome = document.querySelector('#results-at-home');
// var key =  '<replaced with token, see config.js>';   //replace API key with token. done.


//   var saveSearch = function(event) {
//       event.preventDefault();
//       var userFoodInput = document.querySelector('#Food').value;
//       userInput = userFoodInput.toLowerCase();
//       logSearch(userFoodItem);
//       foodApiSearch(userFoodItem);
//   }

var saveSearch = function (event) {
    event.preventDefault();
    var userFoodInput = document.querySelector('#Food').value;
    var userFoodItem = userFoodInput.toLowerCase();
    logSearch(userFoodItem);
    foodApiSearch(userFoodItem);
    userFoodInput.value = '';
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

var foodApiSearch = function (userSearch) {
    var apiUrl = 'https://api.spoonacular.com/recipes/search?query=';
    searchResultsHome.innerHTML = ""
    var dietsCheck = document.querySelector('#diets').value;
    var IntolCheck = document.querySelector('#intolerences').value;


    // fetch(apiUrl + userSearch + "&diet=" + dietsCheck + "&intolerances=" + IntolCheck + "&number=5" + "&" + key).then(function(response) {
    fetch(apiUrl + userSearch + "&diet=" + dietsCheck + "&intolerances=" + IntolCheck + "&number=5" + "&" + myKey).then(function (response) { //change limit here, number=1
        if (response.ok) {
            response.json().then(function (data) {
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
                    listContSpan.setAttribute("style", "margin-bottom: 25px;")
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
                $(document).ready(function () {
                    $('.collapsible').collapsible();
                });
            })
        }
    });

}

var recipeSummary = function (recipeId, i) {
    var recipeSummaryApi = 'https://api.spoonacular.com/recipes/' + recipeId + '/summary' + "?" + myKey;
    fetch(recipeSummaryApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var listContSpan = document.querySelector('#content-' + i);
                listContSpan.innerHTML = data.summary;
            })
        }
    })
}

var loadSearchHistory = function () {
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
$(searchHistory).on("click", "a", function (event) {
    event.preventDefault();
    var buttonEl = event.target.textContent;
    userInput = buttonEl
    foodApiSearch(buttonEl);

    window.google = undefined;
    var GMapSection = document.getElementById("GMapSection");
    var GMapDynamic = document.getElementById("DynamicGMap");

    if (GMapDynamic !== null && GMapDynamic !== '') {
        GMapSection.removeChild(GMapDynamic);
    }
    var removeScriptTag = document.querySelectorAll('script[type="text/javascript"]');
    console.log(removeScriptTag);
    if (removeScriptTag !== null && removeScriptTag !== '') {
        removeScriptTag.remove;
    }

    var GMapParent = document.getElementById('GoogleMap');
    GMapParent.innerHTML = '';
    GMapParent.removeAttribute('style');



    nearbyLocations = [];
    getLocation(buttonEl);
})

loadSearchHistory();

$(document).ready(function () {
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
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var nearbyLocations = [];
var userInput = "";
var prevItem;
var myLatitude;
var myLongitude;
var submitBtn = document.getElementById('food-search');
var homeIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';


var location0, location1, location2, location3, location4;

var locationRating0, locationRating1, locationRating2, locationRating3, locationRating4;

var locationAddy0, locationAddy, locationAddy2, locationAddy3, locationAddy4;

var locationName0, locationName1, locationName2, locationName3, locationName4;

var marker0, marker1, marker2, marker3, marker4;


function getLocation(historyItem) {
    if (navigator.geolocation) {
        prevItem = historyItem;
        console.log(prevItem);
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    myLatitude = position.coords.latitude;
    myLongitude = position.coords.longitude;
    console.log(myLatitude, myLongitude)

    setupAPI(myLatitude, myLongitude);
}

var setupAPI = function (userLat, userLon) {

    var userFoodInput = document.querySelector('#Food').value;

    if (userFoodInput !== null && userFoodInput !== '') {
        gMapsAPI += ("&keyword=" + userFoodInput + "&location=" + userLat + "," + userLon);
        //FoodNearMe(gMapsAPI);
    } else {
        gMapsAPI += ("&keyword=" + prevItem + "&location=" + userLat + "," + userLon);
        console.log(gMapsAPI);
        FoodNearMe(gMapsAPI);

    }

    //Remove parameters from the API call for search history clicks
    gMapsAPI = gMapsAPI.split('&keyword')[0];
}

var FoodNearMe = function (apiString) {
    fetch(proxyurl + apiString).then(function (response) {
        response.json().then(function (JSONresponse) {

            // console.log(apiString);
            //console.log(JSONresponse.results[0].geometry.location.lat);
            //console.log(JSONresponse.results[0].geometry.location.lng);


            for (i = 0; i < 5; i++) {

                var FoodPlace = {
                    name: JSONresponse.results[i].name,
                    rating: JSONresponse.results[i].rating,
                    vicinity: JSONresponse.results[i].vicinity,
                    lat: JSONresponse.results[i].geometry.location.lat,
                    lng: JSONresponse.results[i].geometry.location.lng
                }
                nearbyLocations.push(FoodPlace);
            }

            location5 = {
                lat: myLatitude,
                lng: myLongitude
            };

            // Create the script tag, set the appropriate attributes
            var GMapSection = document.querySelector('#GMapSection');

            var script = document.createElement('script');
            script.defer = true;
            script.async = true;
            script.id = "DynamicGMap"
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKeyMaps + "&callback=initMap";

            // Append the 'script' element to 'head'
            //document.head.appendChild(script);
            GMapSection.appendChild(script);
        })
    })
}
window.initMap = function () {



    var map = new google.maps.Map(
        document.getElementById('GoogleMap'), {
            zoom: 12,
            center: new google.maps.LatLng(this.myLatitude, this.myLongitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

    var markers = [];
    var infoTxt = [];

    for (i = 0; i < this.nearbyLocations.length; i++) {

        this["locationName" + [i]] = nearbyLocations[i].name;
        this["locationRating" + [i]] = nearbyLocations[i].rating;
        this["locationAddy" + [i]] = nearbyLocations[i].vicinity;
        this["location" + [i]] = nearbyLocations[i].lat + ',' + nearbyLocations[i].lng;


        infoTxt[i] = '<center><h5>' + this["locationName" + [i]] + '</h5>' + '<br>' +
            'Rating: ' + this["locationRating" + [i]] + '<br>' +
            '' + this["locationAddy" + [i]] + '</center>';

        var infowindow = new google.maps.InfoWindow({
            content: infoTxt[i]
        });


        markers[i] = new google.maps.Marker({
            position: {
                lat: nearbyLocations[i].lat,
                lng: nearbyLocations[i].lng
            },
            map: map,
            infowindow: infowindow
        });


        markers[i].addListener('mouseover', function (content) {
            this.infowindow.open(map, this);

        });

        markers[i].addListener('mouseout', function () {
            this.infowindow.close();
        });

    }

    /*----------------CREATE HOME MARKER-----------------*/
    var marker5 = new google.maps.Marker({
        position: {
            lat: this.myLatitude,
            lng: this.myLongitude
        },
        map: map,
        icon: homeIcon
    });

    /*----------------HOME MARKER-----------------*/
    var infowindow5 = new google.maps.InfoWindow({
        content: '<h5>Home</h5>'
    });

    marker5.addListener('mouseover', function () {
        infowindow5.open(map, marker5);
    });

    marker5.addListener('mouseout', function () {
        infowindow5.close();
    });

};


submitBtn.addEventListener('click', getLocation);
