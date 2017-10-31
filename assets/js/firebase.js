var fireBaseFav;
// Initialize Firebase
  var config = {
      apiKey: "AIzaSyD4syou7Jr1SRGCxNvCcbjQXLugTPmGZUA",
      authDomain: "rcp-game.firebaseapp.com",
      databaseURL: "https://rcp-game.firebaseio.com",
      projectId: "rcp-game",
      storageBucket: "rcp-game.appspot.com",
      messagingSenderId: "451138795484"
    };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Get the data from firebase

database.ref('/favs').once('value').then(function(snapshot){
fireBaseFav = snapshot.val();
  // console.log("firebase data");
  // console.log(fireBaseFav);
  favItems = [];
  for (var key in fireBaseFav) {
      if (fireBaseFav.hasOwnProperty(key)){
        favItems.push([key,fireBaseFav[key].merchantId,fireBaseFav[key].favCount]);
        // console.log("ItemID -" + key);
        // console.log("MerchantID - "+fireBaseFav[key].merchantId);
        // console.log("FavCount - "+fireBaseFav[key].favCount);
  }
  }
  });

  function checkFev(favArray, favItem){
    var flag = false;
    for (var i = 0; i < favArray.length; i++) {
      if(favArray[i][0] == favItem){
          flag = true;
      }
      }
      return flag;
    }


$("#firstStar").on("click", function() {
  event.preventDefault();
  deal = $(this).attr("data-did");
  merchant = $(this).attr("data-mid");
  count = 1;

// Insert/Update data in firebase
    database.ref('favs/' + deal).set({
      merchantId: merchant,
      favCount: count
    });

});
