
// console.log(document);
// console.log(document.body)

// var cryptoAPI = "https://api.coingecko.com/api/v3/coins/list"; HUMONGOUS LIST 
var cryptoAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"; //list of  coinmarkets for USD currency


// NY times article search API key FsNfuAVsAFoZ1i8vqo2WS22juPus8BzV
var newsKEY = "FsNfuAVsAFoZ1i8vqo2WS22juPus8BzV"
// API KEY secret: 	RIirBciqCEPeBlFZ
var newsAPI ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key="+ newsKEY

// Coin Gecko Fetch
fetch(cryptoAPI)
.then(function(response){
   console.log(response.status); //status ok
   return response.json();
})
.then(function(data){
    console.log(data); //large list
    console.log(data[0].name); //first coin name BITCOIN
})






function getNews(search){

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key="+ newsKEY;

    //NY Times Fetch
    fetch(queryURL)
    .then(function(response){
        
        return response.json();
    })
    .then(function(data){
        $(".news-feeder").empty()
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
//TODO: find "trending" , display on page load
//on page load. For testing
getNews("dogecoin");

var userSearchEl = document.getElementById('userSearch');
function redirectWithSearch() {
    var search = userSearchEl.value.trim();
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
    alert('this button works')
    // Functions to pull all coins go here
}); 