//Fetches link specific to coin
function fetchCoin(link) {
    fetch(link)
    .then(function(response){
        console.log(response.status);
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                appendData(data)

                $("#searchedCoin").text(" " + data.name);
                $("#current-price").text("$" + data.market_data.current_price.usd);

			    var ctx = document.getElementById("focusChart");
                Chart.defaults.global.defaultFontColor = "rgb(250,250,251)";
			    Chart.defaults.global.defaultFontFamily = 'Titillium Web';
			    Chart.defaults.global.defaultFontSize = 14;
			    
                var myChart = new Chart(ctx,{
				
				type: 'bar',
				data: {
					labels: [data.name],
					datasets: [
						{
							label: 'Market Cap',
							data: [data.market_data.market_cap.usd],
							backgroundColor:"rgb(252,250,100)",
							borderColor: "rgb(244,210,39)",
							borderWidth: 8,
						

						}, {
							label: 'Total Volume',
							data: [data.market_data.total_volume.usd],
							backgroundColor: "rgb(79,167,230)",
							borderColor: "rgb(151,204,244)", 
							borderWidth: 5,
						}

					]
				},			
			});
        })
        } else {
            UIkit.modal('#modal-center').show();
        }
    })

}
//when the modal close button is clicked it will send you back to the homepage
$('#modalClose').on('click', function() {
    window.location.replace('./index.html');
})

//appends all coin specific items, including description and image
function appendData(data) {
    var coinName = data.name;
    var description = data.description.en.split('.')[0];
    var price = data.market_data.current_price.usd;
    var high24 = data.market_data.high_24h.usd;
    var low24 = data.market_data.low_24h.usd;
    var marketCap = data.market_data.market_cap.usd;
    var priceChange1h = data.market_data.price_change_percentage_1h_in_currency.usd;
    var ath = data.market_data.ath.usd;
    var atl = data.market_data.atl.usd;
    var athChange = data.market_data.ath_change_percentage.usd;
    var atlChange = data.market_data.atl_change_percentage.usd;
    var imageSource = data.image.large;
    var priceChange1y = data.market_data.price_change_percentage_1y_in_currency.usd;
    $('#coinImage').attr('src', imageSource);
    $('#coin-name').text(coinName);
    $('#description').text(description);
    $('#price').text("Current Price: $" + price);
    $('#high24').text("Highest in the last 24 hours: $" + high24);
    $('#low24').text("Lowest in the last 24 hours: $" + low24);
    $('#marketCap').text("Market Cap: " + marketCap);
    $('#priceChange1h').text("Price Change in the last hour: " + priceChange1h + '%');
    $('#ath').text("All time high: $" + ath);
    $('#atl').text("All time low: $" + atl);
    $('#athChange').text("All time high change: " + athChange + "%");
    $('#atlChange').text("All time low change: " + atlChange + "%");
    $('#priceChange1y').text("Price Change in one year: " + priceChange1y + "%");
}

//this retrieves the user search from the query string generated by the home page
// and calls the fetch function
function getSearch() {
    var queryString = document.location.search;
    var userSearch = queryString.split('=')[1];
    // console.log(userSearch)
    // console.log(userSearch)
    var cryptoAPI = "https://api.coingecko.com/api/v3/coins/" + userSearch + "?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    fetchCoin(cryptoAPI);
    getNews(userSearch);
}

var newsKEY = "FsNfuAVsAFoZ1i8vqo2WS22juPus8BzV"

function getNews(search){

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key="+ newsKEY;

    //NY Times Fetch
    fetch(queryURL)
    .then(function(response){
        // console.log(response.status);
        if(response.ok){
            response.json().then(function(data){
                // console.log(data);
                appendNews(data);
        })
        } else {
            var appendBlock = 
            `
            <div class="uk-alert-danger" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>It looks like we couldn't find any news related to this coin.</p>
</div>`;
        $("#news").append(appendBlock);
        }
    })

}

function appendNews (data) {
    var headline = data.response.docs[0].headline.main
    var abstract = data.response.docs[0].abstract
    var newsLink = data.response.docs[0].web_url
    $('#heading').text(headline)
    $('#abstract').text(abstract)
    $('#newsLink').text(newsLink)
    $('#newsLink').attr('href', newsLink);
}

// runs the function to start the cascade of 
// retrieving, creating, requesting, receiving, and appending
getSearch();

var favsList= JSON.parse(localStorage.getItem("FavoriteCoins")) || [];
$("#coinFocusBtn").click(function(event) {
    event.preventDefault();
    var coin = window.location.search.split('=')[1];
    coin = coin.split(' ').join('-')
    if (favsList.indexOf(coin) > -1) {
        //In the array!
        // alert("this is already in the favs list");
        return;
    } else {
        favsList.push(coin);
        localStorage.setItem('FavoriteCoins', JSON.stringify(favsList));
    
    getFavs();
    }
});

function getFavs(){
    var favorites = JSON.parse(localStorage.getItem("FavoriteCoins"))
    document.getElementById('favorites').innerHTML = '';
    for (var i =0; i <favorites.length; i++){
        // console.log(favorites[i].name)
        var favLi = $("<li>");
        var linkEl = $("<a>");
        linkEl.text(favorites[i]);
        linkEl.attr('href', './coin-focus.html?userSearch=' + favorites[i])
        $("#favorites").append(favLi);
        favLi.append(linkEl);
        
    }
}

getFavs()