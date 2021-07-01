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
			var myChart = new Chart(ctx,{
				
				type: 'bar',
				data: {
					labels: [randomCoin],
					datasets: [
						{
							label: 'Market Cap',
							data: [feature.market_data.market_cap.usd],
							backgroundColor: "rgb(252,250,100)",
							borderColor: "rgb(252,250,100)",
							barPercentage: 0.5,
						

						}, {
							label: 'Total Volume',
							data: [feature.market_data.total_volume.usd],
							backgroundColor: "rgb(79,167,230)",
							borderColor: "rgb(79,167,230)", 
							borderWidth: 4,
							barPercentage: 0.5,
						}

					]
				},
				options: {
					responsive: true,
					scales: {
					  x: {
						 color: "rgb(227,218,226)",
						 title: {
							display: true,
							text: 'Market Data',
							color: "rgb(227,218,226)",
							font: {
							  family: 'Rubik',
							  size: 20,
							  weight: 'bold',
							  lineHeight: 1.2,
							},
							padding: {top: 20, left: 0, right: 0, bottom: 0}
						 }
					  },
					  y: {
						color: "rgb(227,218,226)",
						 title: {
							display: true,
							text: 'Billions USD',
							color: "rgb(227,218,226)",
							font: {
							  family: 'Rubik',
							  size: 20,
							  style: 'normal',
							  lineHeight: 1.2
							},
							padding: {top: 30, left: 0, right: 0, bottom: 0}
						 }
					  }
					}
				}				
			});
		}) 
	}) 
}


	
	
	
	
	
	










			
	
