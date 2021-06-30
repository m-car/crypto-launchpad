function fetchCoin(link) {
    fetch(link)
    .then(function(response){
        console.log(response.status);
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                appendData(data)
        })
        } else {
            UIkit.modal('#modal-center').show();
        }
    })

}

$('#modalClose').on('click', function() {
    window.location.replace('./index.html');
})

function appendData(data) {
    var coinName = data.name;
    var description = data.description.en.split('.')[0] + '.';
    var price = data.market_data.current_price.usd;
    var high24 = data.market_data.high_24h.usd;
    var low24 = data.market_data.low_24h.usd;
    var marketCap = data.market_data.market_cap.usd;
    var priceChange1h = data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(3);
    var ath = data.market_data.ath.usd;
    var atl = data.market_data.atl.usd;
    var athChange = data.market_data.ath_change_percentage.usd.toFixed(3);
    var atlChange = data.market_data.atl_change_percentage.usd.toFixed(3);
    var imageSource = data.image.large;
    $('#coinImage').attr('src', imageSource);
    $('#coin-name').text(coinName);
    $('#description').text(description);
    $('#price').text("Current Price: " + price);
    $('#high24').text("Highest in the last 24 hours: " + high24);
    $('#low24').text("Lowest in the last 24 hours: " + low24);
    $('#marketCap').text("Market Cap: " + marketCap);
    $('#priceChange1h').text("Price Change(%) in the last hour: " + priceChange1h);
    $('#ath').text("All time high: " + ath);
    $('#athChange').text("All time low: " + atl);
    $('#atl').text("All time high change(%): " + athChange);
    $('#atlChange').text("All time low change(%): " + atlChange);
}

function getSearch() {
    var queryString = document.location.search;
    var userSearch = queryString.split('=')[1];
    console.log(userSearch)
    var cryptoAPI = "https://api.coingecko.com/api/v3/coins/" + userSearch + "?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    fetchCoin(cryptoAPI)
}

document.ready() {
    getSearch();
}