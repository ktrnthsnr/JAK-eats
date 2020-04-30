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
    var userFoodInput = document.querySelector('#Food').value;
    var userFoodItem = userFoodInput.toLowerCase();
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
    // var recipeSummaryApi = 'https://api.spoonacular.com/recipes/' + recipeId + '/summary' + "?" + key;
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
    foodApiSearch(buttonEl);
                        //  document.getElementById("#findMenu").focus();    //added focus to page element [kt]
})

loadSearchHistory();

  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('input#input_text, textarea#textarea2').characterCounter();
  });
