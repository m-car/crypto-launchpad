
console.log(document);
// var cryptoAPI = "https://api.coingecko.com/api/v3/coins/list"; HUMONGOUS LIST 
var cryptoAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"; //list of  coinmarkets for USD currency

fetch(cryptoAPI)
.then(function(response){
   console.log(response.status);
   return response.json();
})
.then(function(data){
    console.log(data);
    console.log(data[0].name);
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

var userSearchEl = document.getElementById('userSearch');
function redirectWithSearch() {
    var search = userSearchEl.value.trim();
    if (search) {
        window.location.replace("./coin-focus.html?userSearch=" + search)
    } else {
        //some kind of modal asking the user to input an actual value
    }
}