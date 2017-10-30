
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyC9CKyfiwZyZXVeQgQ-GoTufzljJuDYQjA",
  authDomain: "codingbootcamp-6a8d8.firebaseapp.com",
  databaseURL: "https://codingbootcamp-6a8d8.firebaseio.com",
  projectId: "codingbootcamp-6a8d8",
  storageBucket: "codingbootcamp-6a8d8.appspot.com",
  messagingSenderId: "601031791714"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();




$("#firstStar").on("click", function() {

  event.preventDefault();

  deal = $(this).attr("data-did");
  merchant = $(this).attr("data-mid");
  count = 1;


database.ref().once('value').then(function(snapshot){
  var snapArray = Object.values(snapshot.val());
  console.log(snapArray);
  });

    //look for deal id in firebase
    //if the deal is in the database then increment the favorite count by 1

    //if the deal is NOT in the database then add the deal to the database

    database.ref().push({
      merchantId: merchant,
      dealId: deal, 
      favoriteCount: count
    });

});


