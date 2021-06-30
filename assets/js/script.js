
console.log(document);
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

// Event Listeners for the form
$("#userInput").on('submit', function() {
    alert('this submission works');
    // Functions to search specific coin go here
});

$("#pullAllBtn").on('click', function() {
    alert('this button works')
    // Functions to pull all coins go here
}); 
var coin = "bitcoin"
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + coin + "&api-key="+ newsKEY;
//NY Times Fetch
fetch(queryURL)
.then(function(response){
    console.log(response)
    return response.json();
})
.then(function(data){
    console.log(data);
    console.log(data.response.docs[0].headline.main);
    console.log(data.response.docs[0].abstract)  //    WORKING SEARCH 
    $(".news-feed").html("<h1>" + data.response.docs[0].headline.main + "</h1>");
    $(".news-feed").text( data.response.docs[0].abstract);
})