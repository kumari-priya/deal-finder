$("#search").on("click", function() {
    // Prevent the page from refreshing
    event.preventDefault();

	userSearch = $("#user-search-term").val().trim();
	userLocation = $("#user-location").val().trim();

	console.log(userSearch);
	console.log(userLocation);

	var category = userSearch;
	var webResults = false;
	var results = 5;
	var userPlace = userLocation;

    $("#user-search-term").val('');

	var baseUrl = "https://api.sqoot.com/v2/deals?api_key=6robp6"
	var queryUrl = baseUrl + '&query=' + category+'&location=' + userPlace + '&per_page=' + results + '&online=' + webResults;

 	$.ajax({
        url: queryUrl,
        method: "GET",
        dataType: "jsonp"
        }).done(function(response) { 
        
    	var length = response.deals.length;    
       
        var items = [];

        for (var i = 0; i < length; i++) {

            var merchantName = response.deals[i].deal.merchant.name;
            var long = response.deals[i].deal.merchant.longitude;
            var lat = response.deals[i].deal.merchant.latitude; 

            items.push([merchantName, long, lat]);
            console.log(items);
        }   

    })
});