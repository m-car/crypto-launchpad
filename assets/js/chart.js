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

			var randomColor = ["rgb(252,250,100)", "rgb(79,167,230)", "rgb(176,23,41)", "rgb(24,159,118)", "rgb(162,118,255)"];
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

var base_url = "https://api.coingecko.com/api/v3"
var result = document.getElementById("result")

result.addEventListener("click",function(){
    if (event.target.parentNode.className === "card"){
        location = "coin.html?coin=" + event.target.parentNode.id
    }
})

function showPopularCurrencies(){
    console.log("searching popular currencies")

    var query = new URLSearchParams(location.search)
    var page = query.get("page") || 1

    var sort = document.getElementById("sort").value
    var order = document.getElementById("order").value

    var xhr = new XMLHttpRequest();
    
    var params = new URLSearchParams()
    params.append("vs_currency", "usd")
    params.append("order", sort+order)
    params.append("per_page", "10")
    params.append("page", page)
    params.append("price_chage_percentage", "24h")
    xhr.open("GET", base_url+"/coins/markets?"+params);
    
    xhr.setRequestHeader("accept", "application/json")
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.status)
        var data = JSON.parse(this.response);
        displayCoins(data)
    }
}

function displayCoins(data){
    var arr = data

    result.innerHTML = ""

    var pages = document.createElement("div")
    for (var i=0;i<10;i++){
        var a = document.createElement("a")
        a.innerText = (i+1)
        a.href = "popularCurrencies.html?page="+ (i+1)
        a.style.padding = "10px"
        pages.appendChild(a)
    }
    document.getElementById("pages").innerHTML = ""
    document.getElementById("pages").append(pages)
    // result.append(pages)

    arr.forEach(function(cryptocurrency){
        var div = createCard(cryptocurrency);
        result.append(div)
    })

    function createCard(cryptocurrency){
        var div = document.createElement("div");
        div.setAttribute("class","card");
        div.setAttribute("id",cryptocurrency["id"])
        var img = document.createElement("img");
        img.setAttribute("src", cryptocurrency.image)
        var details = document.createElement("div");
        details.innerText =  cryptocurrency.name

        var price = document.createElement("div");
        price.innerText = "$ "+Math.round(100*cryptocurrency.current_price)/100
        var priceChange = document.createElement("div");
        priceChange.innerText = "(" + Math.round(100*cryptocurrency.price_change_percentage_24h)/100 + "%)"
        priceChange.style.fontSize = "13px"
                
        if (cryptocurrency.price_change_percentage_24h > 0) {
            price.style.color = "green"
            priceChange.style.color = "green"
        }
        else {
            price.style.color = "red"
            priceChange.style.color = "red"
        }
        div.append(img,details,price,priceChange);
        return div

    }
}

function coinUnavailable(){
	console.log("Coin not available! Please try again!")
	h1 = document.createElement("h1")
	h1.innerText = "Coin not available! Please try again..."
	h1.setAttribute("class","sub-heading")
	document.getElementById("coinResult").append(h1)
}


function createDiv(str){
	var div = document.createElement("div")
	div.innerText = str
	div.setAttribute("class","uk-card uk-card-default uk-card-body")
	return div
}
	
	
	
	
	
	
	
	










			
	
