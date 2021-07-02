window.addEventListener('load', setup);

var trendingCoins = [];
var randomCoin = "";

function setup(){
	fetch("https://api.coingecko.com/api/v3/search/trending")
	.then(function(response){
		console.log(response)
		return response.json();
	})
	.then(function(trending){
		console.log(trending);	
		for( var i = 0; i < trending.coins.length; i++){
			trendingCoins[i] = trending.coins[i].item.id;
		}

		randomCoin = trendingCoins[Math.floor(Math.random() * trending.coins.length)];

		var cryptoAPI = "https://api.coingecko.com/api/v3/coins/" + randomCoin 
		fetch(cryptoAPI)
		.then(function(response){
			console.log(response)
			return response.json();
		})
		.then(function(feature){
			console.log(feature);	

			$("#trending-coin").text(" " + feature.name);

			var ctx = document.getElementById("myChart");
			console.log(Chart.defaults);
			Chart.defaults.global.defaultFontColor = "rgb(250,250,251)";
			Chart.defaults.global.defaultFontFamily = 'Titillium Web';
			Chart.defaults.global.defaultFontSize = 14;


			var myChart = new Chart(ctx,{
				
				type: 'bar',
				data: {
					labels: [randomCoin],
					datasets: [
						{
							label: 'Market Cap',
							data: [feature.market_data.market_cap.usd],
							backgroundColor: "rgb(252,250,100)",
							borderColor: "rgb(244,210,39)",
							borderWidth: 8,
						}, {
							label: 'Total Volume',
							data: [feature.market_data.total_volume.usd],
							backgroundColor: "rgb(79,167,230)",
							borderColor: "rgb(151,204,244)", 
							borderWidth: 5,
						}

					]
				},		
			});
		}) 
	}) 
}


	
	
	
	
	
	










			
	
