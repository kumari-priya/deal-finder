var start = {lat: 37.785, lng: -122.395};
function initMap(items) {
    var myLatLng = {lat: 37.785, lng: -122.395};
    var Tname;
    if(items.length < 1){
    }
    else{
      Tname = items;
    }
  console.log(items)
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: myLatLng
    });

  console.log(items);
  if(Tname.length>0){
    for (var j = 0; j < Tname.length; j++) {
      console.log(Tname[j]);
      var bizLatLang = {lat : Tname[j][2], lng: Tname[j][1]}
      console.log(bizLatLang);

      var marker = new google.maps.Marker({
        position: bizLatLang,
        map: map,
        title: Tname[j][0],
      });
      // addMessage(marker, Tname[j][0]);
      showDirection(marker);
    }
  }
}

  // function addMessage(marker, secretMessage) {
  //     var infowindow = new google.maps.InfoWindow({
  //       content: secretMessage
  //     });
  //
  //     marker.addListener('click', function() {
  //       infowindow.open(marker.get('map'), marker);
  //       alert(marker.position);
  //       initDirectionMap(start,marker.position,'DRIVING')
  //     });
  //
  // }

  function showDirection(marker){
    marker.addListener('click', function() {
      initDirectionMap(start,marker.position,'DRIVING')
    });
  }

  // ==========================Directions =====================

  function initDirectionMap(start,end,mode) {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: start
    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService,directionsDisplay,start,end,mode);
    // document.getElementById('mode').addEventListener('change', function() {
    //   calculateAndDisplayRoute(directionsService, directionsDisplay);
    // });
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay,start,end,selectedMode) {
    // var selectedMode = document.getElementById('mode').value;
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: selectedMode
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
