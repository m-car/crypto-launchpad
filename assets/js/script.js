//https://www.coingecko.com/en/api#explore-api
var cryptoAPI = "https://coingecko.com/api/documentations/v3";
console.log("log test")
// fetch(cryptoAPI , function(response){
//     return response.json();
// })
// .then(function(data){
//     console.log(data);
// })
fetch('https://api.github.com/repos/nodejs/node/issues?per_page=5').then(function(response){console.log(response)});