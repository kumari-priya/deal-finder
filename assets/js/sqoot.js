var mainDealDisplay = []; 
var items = [];
var userlat;
var userlng;
var userSearch;
var userLocation;
var length;

//Tranform userLocation to lat/long
//get selected business lat/long

$("#search").on("click", function(event) {
    // Prevent the page from refreshing
  event.preventDefault();
  $('.deal-row').empty();
    
  //Get items from input form and assign them to global variables
  userSearch = $(".user-search-term").val().trim();
  userLocation = $(".user-location").val().trim();

  //Console log the two search terms to make sure they are being retrieved from the UI
  console.log(userSearch);
  console.log(userLocation);

  var webResults = false;
  var results = 5;

  //Set the UI input fields back to blank for the user
  $(".user-search-term").val('');
  $(".user-location").val('');

  //Use the userLocation to retrieve the latitude and longitude where the user marker should be placed
  //This will be retrieved using the google geolocation API
  geocode(userLocation);

  function geocode(searchlocation) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: searchlocation,
        key: 'AIzaSyAvZV3rec51FwhSWqrrRkCySQw6h0cKfJk'
      }
    })
    .then(function(response) {
      userlat = response.data.results[0].geometry.location.lat;
      userlng = response.data.results[0].geometry.location.lng;

      console.log(userlat);
      console.log(userlng);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  //Use the userLocation and userSearch to retrieve the types of deals in the area where the user is searching
  //This will be retrieved using the sqoot API
  var baseUrl = "https://api.sqoot.com/v2/deals?api_key=6robp6"
  var queryUrl = baseUrl + '&query='+ userSearch + '&location=' + userLocation + '&per_page=' + results + '&online=' + webResults;


  $.ajax({
      url: queryUrl,
      method: "GET",
      dataType: "jsonp"
      }).done(function(response) { 
      
      length = response.deals.length;  
     
      for (var i = 0; i < length; i++) {

          var merchantName = response.deals[i].deal.merchant.name;
          var long = response.deals[i].deal.merchant.longitude;
          var lat = response.deals[i].deal.merchant.latitude; 
          
          items.push([merchantName, long, lat]);
          console.log(items);

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
          var tableData4 = $('<td class="centerText">').text(discount+price);  
          var tableData5 = $('<td class="centerText">').text(discount);  

          tableRow.append(tableData1);
          tableRow.append(tableData2);
          tableRow.append(tableData3);
          tableRow.append(tableData4);
          tableRow.append(tableData5);
           
          $('.main-deal-table').append(tableRow);

      }  

        initMap(items,userlat,userlng);
  
    })
});

$( document ).ready(function() {
    initMap(items);
});