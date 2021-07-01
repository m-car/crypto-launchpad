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

			$("#current-price").text(" " + feature.name);

			var randomColor = ["rgb(252,250,100)", "rgb(79,167,230)",];
			var ctx = document.getElementById("myChart");
			var myChart = new Chart(ctx,{
				
				type: 'bar',
				data: {
					labels: [randomCoin],
					datasets: [
						{
							label: 'Market Cap',
							data: [feature.market_data.market_cap.usd],
							backgroundColor:"rgb(252,250,100)",
							borderColor: "rgb(252,250,100)",
							borderDash: [5, 5],
						

						}, {
							label: 'Total Volume',
							data: [feature.market_data.total_volume.usd],
							backgroundColor: "rgb(79,167,230)",
							borderColor: "rgb(79,167,230)", 
							borderWidth: 4
						}

					]
				},			
			});
		}) 
	}) 
}	
	
	
	
	
	
	
	
	










			
	
