
//Create global variable to store the latitude and longitude for the user
var userLatLang;


//

function initMap(items) {
  userLatLang = {lat: userlat, lng: userlng};  
  
  var map = new google.maps.Map(document.getElementById("map_div"), {
    zoom: 11,
    center: userLatLang,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  if(items.length>0){
    for (var j = 0; j < items.length; j++) {
      console.log(items[j]);
      var bizLatLang = {lat : items[j][2], lng: items[j][1]}
      console.log(bizLatLang);

      var marker = new google.maps.Marker({
        position: bizLatLang,
        map: map,
        title: items[j][0],
      });
      // addMessage(marker, Tname[j][0]);
      showDirection(marker);
    }
      $('#map_div').show();
  }
  else{
      $('#map_div').hide();
  }
}


  function showDirection(marker){
    marker.addListener('click', function() {
      initDirectionMap(userLatLang,marker.position,'DRIVING')
    });
  }

  // ==========================Directions =====================

  function initDirectionMap(userLatLang,bizLatLang,mode) {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById("map_div"), {
      center: userLatLang,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService,directionsDisplay,userLatLang,bizLatLang,mode);

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay,userLatLang,bizLatLang,selectedMode) {
    // var selectedMode = document.getElementById('mode').value;
    directionsService.route({
      origin: userLatLang,
      destination: bizLatLang,
      travelMode: selectedMode
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
