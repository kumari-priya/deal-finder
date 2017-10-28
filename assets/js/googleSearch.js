
var placeSearch;
var autocomplete;


function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
            {types: ['geocode']});
      };

      function fillInAddress() {
        var place = autocomplete.getPlace();
        // // get lat
        // var lat = place.geometry.location.lat();
        // // get lng
        // var lng = place.geometry.location.lng();

        console.log(lat);
        console.log(lng);

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }
      };
