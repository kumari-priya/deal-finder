var mainDealDisplay = [];
var items = [], info= [], favItems =[] ;
var userlat, userlng, userSearch, userLocation, length, address;


$("form").on("submit", function(event) {
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
  var tableWhole = $('<table class="table table-striped" id="main-deal-table">')
  var tableHeaderRow = $('<tr id="table-header-row">')

  //Build the table header
  var tableHeader0 = $('<th>');
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
  tableHeaderRow.append(tableHeader0);
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
      console.log(response);
      items = [];
      console.log("favItems");
      console.log(favItems);

      for (var i = 0; i < length; i++) {

          var dealResponse = response.deals[i].deal;

          var merchantName = dealResponse.merchant.name;
          var long = dealResponse.merchant.longitude;
          var lat = dealResponse.merchant.latitude;

          items.push([merchantName, long, lat]);

          var dealIdentifier = dealResponse.id;
          var merchantIdentifier = dealResponse.merchant.id;
          var discount = dealResponse.discount_amount;
          var discountPercent = dealResponse.discount_percentage;
          var expires = dealResponse.expires_at;
          var finePrint = dealResponse.fine_print;
          var image = dealResponse.image_url;
          var shortTitle = dealResponse.short_title;
          var title = dealResponse.title;
          var price = dealResponse.price;
          var address = dealResponse.merchant.address;
          var phone = dealResponse.merchant.phone_number;
          var city = dealResponse.merchant.locality;
          var state = dealResponse.merchant.region;
          var zipcode = dealResponse.merchant.postal_code;
          var merchantUrl = dealResponse.merchant.url;
          var dealDescription = dealResponse.description;


          info.push([address, city, state, zipcode, phone, shortTitle, merchantName, merchantUrl, image, expires, finePrint, price, title, dealDescription]);
          console.log("Deal Info:")
          console.log(info);

          // Check favourite
          console.log("dealIdentifier" + dealIdentifier);
          if(checkFev(favItems,dealIdentifier)){
            var tableData0 = $('<td><span class="glyphicon glyphicon-star-empty"></span></td>');
          }
          else{
            //hide star
            var tableData0 = $('<td></td>');
          }

          var tableRow = $('<tr class="deal-row">');

          var tableData1 = $('<td class="details" data-mid="'+merchantIdentifier+'" data-did="'+dealIdentifier+'" data-name="'+merchantName+'" data-lng="'+long+'" data-lat="'+lat+'" data-bizaddy="'+address+'">').html('<a>'+merchantName+'</a>');          var tableData2 = $('<td>').text(title);
          var tableData2 = $('<td>').text(title);
          var tableData3 = $('<td class="centerText">').text(price);
          var tableData4 = $('<td class="centerText">').text(discount+price);
          var tableData5 = $('<td class="centerText">').text(discount);

          tableRow.append(tableData0)
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

        console.log("List of Retrieved Elements:")
        console.log(theItem);


        var lineTwo = $("<div class='addressDisplay'>")

        var lineTwoA = $("<span>").text(theItem[0]);
        var lineTwoB = $("<br>")
        var lineTwoC = $("<span>").text(theItem[1] + ', ' + theItem[2] + ' ' + theItem[3]);

        lineTwo.append(lineTwoA);
        lineTwo.append(lineTwoB);
        lineTwo.append(lineTwoC);


        var lineThree = $("<p class='phoneDisplay'>").text(theItem[4]);
        var lineFour = $("<p class='dealDisplay'>").text(theItem[5]);
        var lineFive = $("<p class='dealDisplay'>").text(theItem[5]);
        var lineDealDescription = $("<p class='dealDisplay'>").text(theItem[5]);
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
