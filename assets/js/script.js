
console.log(document);
console.log(document.body)
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
$("#userInput").on('submit', function(event) {
    event.preventDefault();
    // Functions to search specific coin go here
    redirectWithSearch();
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

    $(".news-feed #heading").text(data.response.docs[0].headline.main);
    $(".news-feed #abstract").text(data.response.docs[0].abstract);
    $(".news-feed #newsLink").text(data.response.docs[0].web_url);


})


// GET NEWS FUNCTION TO BE CALLED WHEN SEARCH IS EXECUTED 
// function getNews(search){

// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key="+ newsKEY;

//     //NY Times Fetch
//     fetch(queryURL)
//     .then(function(response){
//         console.log(response)
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         console.log(data.response.docs[0].headline.main);
//         console.log(data.response.docs[0].abstract)  //    WORKING SEARCH 
//         var newsHeadline = document.createElement("h2");
//         newsHeadline = data.response.docs[0].headline.main;
//         $(".news-feed").appendchild(newsHeadline);
//         $(".news-feed").text( data.response.docs[0].headline.main);
//         // $(".news-feed").text( data.response.docs[0].abstract);
//     })

// }

// defines function called in the submission event listener
// redirects to coin specific page with query string carrying user input
var userSearchEl = document.getElementById('userSearch');
function redirectWithSearch() {
    var search = userSearchEl.value.trim();
    search = search.split(' ').join('-')
    if (search) {
        window.location.replace("./coin-focus.html?userSearch=" + search)
    } else {
        alert('somethings wrong')
        //some kind of modal asking the user to input an actual value
    }
}

// function fetchAll() {
//     fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
//     .then(function(response){
//         console.log(response.status);
//         if(response.ok){
//             response.json().then(function(data){
//                 console.log(data);
//         } else {
//             UIkit.modal('#modal-center').show();
//         }
// }
// }