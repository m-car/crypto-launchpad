function fetchCoin(link) {
    fetch(link)
    .then(function(response){
        console.log(response.status);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

function appendData() {
    
}

function getSearch() {
    var queryString = document.location.search;
    var userSearch = queryString.split('=')[1];
    console.log(userSearch)
    var cryptoAPI = "https://api.coingecko.com/api/v3/coins/" + userSearch + "?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    fetchCoin(cryptoAPI)
}

getSearch();