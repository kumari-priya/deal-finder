$("#search").on("click", function() {
    // Prevent the page from refreshing
    $('.deal-row').empty();

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
	var queryUrl = baseUrl + '&query='+ category + '&location=' + userPlace + '&per_page=' + results + '&online=' + webResults;
    var mainDealDisplay = []; 
    var items = [];


    $.ajax({
        url: queryUrl,
        method: "GET",
        dataType: "jsonp"
        }).done(function(response) { 
        
        var length = response.deals.length;  

        // console.log("Lenght: ", length);

       
        for (var i = 0; i < length; i++) {



            var merchantName = response.deals[i].deal.merchant.name;
            var long = response.deals[i].deal.merchant.longitude;
            var lat = response.deals[i].deal.merchant.latitude; 
            
            items.push([merchantName, long, lat]);

            var discount = response.deals[i].deal.discount_amount; 
            var discountPercent = response.deals[i].deal.discount_percentage; 
            var expires = response.deals[i].deal.expires_at;
            var finePrint = response.deals[i].deal.fine_print; 
            var image = response.deals[i].deal.image_url; 
            var shortTitle = response.deals[i].deal.short_title; 
            var title = response.deals[i].deal.title; 
            var price = response.deals[i].deal.price; 
            var address = response.deals[i].deal.merchant.address; 
            var phone = response.deals[i].deal.merchant.phone_number; 
            var city = response.deals[i].deal.merchant.locality; 
            var state = response.deals[i].deal.merchant.region;
            var merchantUrl = response.deals[i].deal.merchant.url;   

              var tableRow = $('<tr class="deal-row">');

              var tableData1 = $('<td>').text(merchantName);
              var tableData2 = $('<td>').text(title);
              var tableData3 = $('<td class="centerText">').text(price);
              var tableData4 = $('<td class="centerText">').text(discount);
           

              tableRow.append(tableData1);
              tableRow.append(tableData2);
              tableRow.append(tableData3);
              tableRow.append(tableData4);
             

              $('#main-deal-table').append(tableRow);

        }  
  
    })
});