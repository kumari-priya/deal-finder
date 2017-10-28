var autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
  (document.getElementById('autocomplete')),
  {types: ['geocode']});
  };

function fillInAddress() {
  var place = autocomplete.getPlace();
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }
};