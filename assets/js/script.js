
// console.log(document);
// console.log(document.body)

// var cryptoAPI = "https://api.coingecko.com/api/v3/coins/list"; HUMONGOUS LIST 
var cryptoAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"; //list of  coinmarkets for USD currency


// NY times article search API key FsNfuAVsAFoZ1i8vqo2WS22juPus8BzV
var newsKEY = "FsNfuAVsAFoZ1i8vqo2WS22juPus8BzV"
// API KEY secret: 	RIirBciqCEPeBlFZ
var newsAPI ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key="+ newsKEY

function getRandom(max){
    return Math.floor(Math.random() * max );
}


// Coin Gecko Fetch
var trending = fetch(cryptoAPI)
.then(function(response){
   console.log(response.status); //status ok
   return response.json();
})
.then(function(data){
    console.log(data); //large list

   var trending = [];
   for (var i = 0; i < data.length && i <10; i++){
       trending.push(data[i].id);
    }
    // console.log(trending.length); 
    getNews(trending[getRandom(trending.length)]) ;
    return trending;
});


function getNews(search){

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=crypto" + search + "&api-key="+ newsKEY;

    //NY Times Fetch
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        $(".news-feeder").empty()
        console.log(data);
        for(var i =0; i< data.response.docs.length && i < 5; i++){
            // turn h2 into the link 
            var newsDiv = $("<div>")
            var heading = $("<h2 class='heading'>").text(data.response.docs[i].headline.main);
            var abstract = $("<p class='abstract'>").text(data.response.docs[i].abstract); 
            var link = $("<a class='newsLink'>").attr("href",data.response.docs[i].web_url).text(data.response.docs[0].web_url);
                
            newsDiv.append(heading, abstract, link);
            $(".news-feeder").append(newsDiv);
        }
    })

}




// defines function called in the submission event listener
// redirects to coin specific page with query string carrying user input
var userSearchEl = document.getElementById('userSearch');
function redirectWithSearch() {
    var search = userSearchEl.value.trim();
    search = search.split(' ').join('-')
    if (search) {
        window.location.replace("./coin-focus.html?userSearch=" + search)
    } else {
        //some kind of modal asking the user to input an actual value
    }
}

// Event Listeners for the form
$("#userInput").on('submit', function(event) {
    event.preventDefault();
    // Functions to search specific coin go here
    var search = $("#userSearch").val().trim();
    console.log(search);
    // getNews(search);  //Keep for homepage news search , comment out redirectWithSearch()
    redirectWithSearch();
});

$("#pullAllBtn").on('click', function() {
    $("#coin-list").show();
    showPopularCurrencies();
    // Functions to pull all coins go here
}); 


var favsList= JSON.parse(localStorage.getItem("FavoriteCoins")) || [];
console.log(favsList);
$("#favoriteBtn").click(function(event) {
    event.preventDefault();
    var search = $("#userSearch").val().trim()
    favsList.push(search);
    localStorage.setItem('FavoriteCoins', JSON.stringify(favsList));
    alert(localStorage.getItem("FavoriteCoins"));
    
   getFavs();
});

function getFavs(){
    var favorites = JSON.parse(localStorage.getItem("FavoriteCoins"))
    console.log(favorites);
    for (var i =0; i <favorites.length; i++){
        // console.log(favorites[i].name)
        var favLi = $("<li>");
        favLi.text(favorites[i]);
        $("#favorites").append(favLi);

    }}

var base_url = "https://api.coingecko.com/api/v3"
var result = document.getElementById("result")

function showPopularCurrencies(){
    console.log("searching popular currencies")

    var query = new URLSearchParams(location.search)
    var page = query.get("page") || 1

    var sort = document.getElementById("sort").value
    var order = document.getElementById("order").value
    
    var params = new URLSearchParams()
    params.append("vs_currency", "usd")
    params.append("order", sort+order)
    params.append("per_page", "52")
    params.append("page", page)
    params.append("price_chage_percentage", "24h")
    
    fetch(base_url+"/coins/markets?"+params)
    .then(function(response){
    console.log(response.status);
    return response.json();
    })
    .then(function(data){
        console.log(data); 
        displayCoins(data);
    })
}

function displayCoins(data){
    var d = data

    result.innerHTML = ""

    d.forEach(function(cryptocurrency){
        var div = createCard(cryptocurrency);
        result.append(div)
    })

    function createCard(cryptocurrency){
        var div = document.createElement("div");
        div.setAttribute("class","card");
        div.setAttribute("id",cryptocurrency["id"])
        var img = document.createElement("img");
        img.setAttribute("src", cryptocurrency.image)
        var details = document.createElement("div");
        details.innerText =  cryptocurrency.name

        var price = document.createElement("div");
        price.innerText = "$ "+Math.round(100*cryptocurrency.current_price)/100
        var priceChange = document.createElement("div");
        priceChange.innerText = "(" + Math.round(100*cryptocurrency.price_change_percentage_24h)/100 + "%)"
        priceChange.style.fontSize = "13px"
                
        if (cryptocurrency.price_change_percentage_24h > 0) {
            price.style.color = "green"
            priceChange.style.color = "green"
        }
        else {
            price.style.color = "red"
            priceChange.style.color = "red"
        }
        div.append(img,details,price,priceChange);
        return div

    }
}

