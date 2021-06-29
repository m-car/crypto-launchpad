
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
$("#userInput").on('submit', function() {
    alert('this submission works');
})