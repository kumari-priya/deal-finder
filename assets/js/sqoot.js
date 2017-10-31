var mainDealDisplay = [];
var items = [], info= [];
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
  var tableWhole = $('<table class="table table-striped" id="main-deal-table"><tbody></tbody></table>')
  var tableHeaderRow = $('<tr id="table-header-row">')
  
  //Build the table header
  var tableHeader0 = $('<th>').text('Favorite');
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


      for (var i = 0; i < length; i++) {

          var merchantName = response.deals[i].deal.merchant.name;
          var long = response.deals[i].deal.merchant.longitude;
          var lat = response.deals[i].deal.merchant.latitude;
          
          items.push([merchantName, long, lat]);
          
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
          var dealDescription = response.deals[i].deal.description;

          
          info.push([address, city, state, zipcode, phone, shortTitle, merchantName, merchantUrl, image, expires, finePrint, price, title, dealDescription]); 
          console.log("Deal Info:")
          console.log(info); 


          var tableRow = $('<tr class="deal-row">');

          var tableData1 = $('<td class="details" data-mid="'+merchantIdentifier+'" data-did="'+dealIdentifier+'" data-name="'+merchantName+'" data-lng="'+long+'" data-lat="'+lat+'" data-bizaddy="'+address+'">').html('<a>'+merchantName+'</a>');          var tableData2 = $('<td>').text(title);
          var tableData2 = $('<td>').text(title);
          var tableData3 = $('<td class="centerText">').text('$' + parseFloat(price,10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
          var tableData4 = $('<td class="centerText">').text('$' + parseFloat((price+discount),10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
          var tableData5 = $('<td class="centerText">').text('$' + parseFloat(discount,10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        
          tableRow.append('place');
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
        $(".mainDealDiv").empty();
        $("#secondBox").empty();

        $("#firstBox").hide(); 
        $("#secondBox").show(); 

        var bizName  = $(this).attr("data-name");

        var theItem

        info.forEach(item => {
          if(item.indexOf(bizName) > 0){
            theItem = item
          }
        }); 

        console.log("List of Retrieved Elements:")
        console.log(theItem);

        var divContainer = $("<div class='mainDealDiv'>");
        var divHeader = $("<div class='dealHeader'>");
        var divAddress = $("<div class='addressDisplay'>");

        var divShortTitle = $("<div class='shortTitleDisplay'>");
        var divLongTitle = $("<div class='longTitleDisplay'>");
        var divDealDescription = $("<div class='dealDescriptionDisplay'>");
        var divFinePrint = $("<div class='finePrintDisplay'>");

        var headerMerchant = $("<h2>").text(bizName);
        var favHeartEmpty = $("<span class='glyphicon glyphicon-heart-empty' id='empty-heart'>")
        var favHeartFull = $("<span class='glyphicon glyphicon-heart' id='full-heart'>")
        

        var lineAddress1 = $("<span>").text(theItem[0]); 
        var lineAddress2 = $("<br>")
        var lineAddress3 = $("<span>").text(theItem[1] + ', ' + theItem[2] + ' ' + theItem[3]);    
        var linePhone = $("<p class='phoneDisplay'>").text(theItem[4]);


        var lineShortTitle = $("<p class='shortT'>").text(theItem[5]);  
        var lineLongTitle = $("<p class='longT'>").text(theItem[12]);  
        var lineDealDescription = $("<p class='dealDesc'>").text(theItem[13]);
        var lineFinePrint = $("<p class='dealFine'>").text("Fine Print: " + theItem[10]);  

        divHeader.append(headerMerchant,favHeartEmpty,favHeartFull);
        divShortTitle.append(lineShortTitle);
        divLongTitle.append(lineLongTitle);
        divDealDescription.append(lineDealDescription);
        divFinePrint.append(lineFinePrint);

        $("#secondBox").append(divContainer);
        $(".mainDealDiv").append(divHeader,divShortTitle,divLongTitle,divDealDescription,divFinePrint);

        
        var merchant  = $(this).attr("data-name");
        var businessLat  = $(this).attr("data-lat");
        var businessLng  = $(this).attr("data-lng");
        var businessAddress = $(this).attr("data-bizaddy")
        var dealId = $(this).attr("data-did");
        var merchantId = $(this).attr("data-mid");
        var userPosition = {lat: userlat, lng: userlng};
        var businessLatLng = {lat: parseFloat(businessLat), lng: parseFloat(businessLng)};

        $('#empty-heart').attr("data-mid",merchantId);
        $('#empty-heart').attr("data-did", dealId);

        initDirectionMap(userPosition,businessLatLng,'DRIVING')

      $("#empty-heart").on("click", function(eventFour) {
        eventFour.preventDefault(); 
        $("#empty-heart").hide(); 
        $("#full-heart").show();

        firebaseTrigger();

        console.log(merchantId,dealIdentifier)
      });

      });
});

$("#goHome").on("click", function(eventThree) {

  $("#secondBox").hide(); 
  $("#firstBox").show();  
}); 

$( document ).ready(function() {
  $('#map').hide();
  $("#secondBox").hide(); 
});