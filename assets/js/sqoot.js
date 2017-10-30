var mainDealDisplay = [];
var items = [], info= [];
var userlat, userlng, userSearch, userLocation, length, address; 


$("#search").on("click", function(event) {
    // Prevent the page from refreshing
  event.preventDefault();

  $('#deal-table-panel').remove();
    
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


  //Start building the elements inside the deal-table-row, including panel, and table that will contain the deal data
  var boostrapTablePanel     = $('<div class="panel panel-default" id="deal-table-panel">'),
      boostrapTablePanelBody = $('<div class="panel-body" id="deal-table-panel-body">');
  var tableWhole = $('<table class="table" id="main-deal-table">')
  var tableHeaderRow = $('<tr id="table-header-row">')
  
  //Build the table header
  var tableHeader1 = $('<th>').text('Business Name');
  var tableHeader2 = $('<th>').text('Deal');
  var tableHeader3 = $('<th class="centerText">').text('Deal Price');
  var tableHeader4 = $('<th class="centerText">').text('Original Value');  
  var tableHeader5 = $('<th class="centerText">').text('Discount');

  //Append the table panel to the deal-table-row that is on the index page to hold the table
  $('#deal-table-row').append(boostrapTablePanel);
  //Append the table panel body to the panel that was just created and appended
  $('#deal-table-panel').append(boostrapTablePanelBody);
  //Append the table to the panel body that was just created and appended
  $('#deal-table-panel-body').append(tableWhole);

  //Fill out the header row with the relevant headers, then append the header to the table
  tableHeaderRow.append(tableHeader1);
  tableHeaderRow.append(tableHeader2);
  tableHeaderRow.append(tableHeader3);
  tableHeaderRow.append(tableHeader4);
  tableHeaderRow.append(tableHeader5);
  $('#main-deal-table').append(tableHeaderRow);


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
      // Priya- empty the array
      items = [];


      for (var i = 0; i < length; i++) {

          var merchantName = response.deals[i].deal.merchant.name;
          var long = response.deals[i].deal.merchant.longitude;
          var lat = response.deals[i].deal.merchant.latitude;

          console.log("Lng");
          console.log(long);
          console.log("Lat");
          console.log(lat);

          items.push([merchantName, long, lat]);
          
          console.log(items);

          var dealIdentifier = response.deals[i].deal.id;
          var merchantIdentifier = response.deals[i].deal.merchant.id;
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
          var zipcode = response.deals[i].deal.merchant.postal_code;
          var merchantUrl = response.deals[i].deal.merchant.url;

          
          info.push([address, city, state, zipcode, phone, shortTitle, merchantName]); 
          console.log(info); 


          var tableRow = $('<tr class="deal-row">');
          

          var tableData1 = $('<td class="details" data-mid="'+merchantIdentifier+'" data-did="'+dealIdentifier+'" data-name="'+merchantName+'" data-lng="'+long+'" data-lat="'+lat+'" data-bizaddy="'+address+'">').html('<a>'+merchantName+'</a>');          var tableData2 = $('<td>').text(title);
          var tableData2 = $('<td>').text(title);
          var tableData3 = $('<td class="centerText">').text(price);
          var tableData4 = $('<td class="centerText">').text(discount+price);
          var tableData5 = $('<td class="centerText">').text(discount);
        

          tableRow.append(tableData1);
          tableRow.append(tableData2);
          tableRow.append(tableData3);
          tableRow.append(tableData4);
          tableRow.append(tableData5);
        
          $('#main-deal-table').append(tableRow);


      }
        initMap(items);

    })

      $(document).on("click", ".details", function(eventTwo){

        $('#secondRow').empty();
        $("#firstBox").hide(); 
        $("#secondBox").show(); 

        var name  = $(this).attr("data-name");
        var lineOne = $("<h1>").text(name);
        var theItem
        info.forEach(item => {
          if(item.indexOf(name) > 0){
            theItem = item
          }
        }); 
        console.log("===========", theItem)

        var lineTwo = $("<p class='addressDisplay'>").text("a: " + theItem[0] + theItem[1] + theItem[2] + theItem[3]); 
        var lineThree = $("<p class='phoneDisplay'>").text("p: " + theItem[4]);
        var lineFour = $("<p class='dealDisplay'>").text(theItem[5]);  

        $("#secondRow").append(lineTwo);
        $("#secondRow").append(lineThree);
        $("#secondRow").append(lineFour); 
        

        var merchant  = $(this).attr("data-name");
        var businessLat  = $(this).attr("data-lat");
        var businessLng  = $(this).attr("data-lng");
        var businessAddress = $(this).attr("data-bizaddy")
        var dealId = $(this).attr("data-did");
        var merchantId = $(this).attr("data-mid");
        var userPosition = {lat: userlat, lng: userlng};
        var businessLatLng = {lat: parseFloat(businessLat), lng: parseFloat(businessLng)};

        $('#firstStar').attr("data-mid",merchantId);
        $('#firstStar').attr("data-did", dealId);

        initDirectionMap(userPosition,businessLatLng,'DRIVING')


      });
});

$("#goHome").on("click", function(eventThree) {

  $("#secondBox").hide(); 
  $("#firstBox").show();  
}); 

$("#firstStar").on("click", function(eventFour) {
  eventFour.preventDefault(); 
  $("#firstStar").hide(); 
  $("#secondStar").show(); 
});

$("#secondStar").on("click", function(eventFive) {
  eventFive.preventDefault(); 
  $("#firstStar").show(); 
  $("#secondStar").hide(); 
});

$( document ).ready(function() {
  $('#map').hide();
  $("#secondBox").hide(); 
  //initMap(items);
  $("#secondStar").hide(); 
});




