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
        title: Tname[j][0]
      });

    }
  }

  }