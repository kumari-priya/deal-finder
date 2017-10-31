
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

const db = firebase.database();
const deals = db.ref().child("deals");

// Create a variable to reference the database.


$("#firstStar").on("click", function() {

  event.preventDefault();
  
  deal = $(this).attr("data-did");
  merchant = $(this).attr("data-mid");
  count = 1;

  deals.child(deal).set({
    "merchantIdentifier": merchant,
    "favoriteCount": count
  });
  // const rootRef = firebase.database().ref();

  // const oneRef = rootRef.orderByChild('dealId').equalTo('4106722');
  // console.log(oneRef);

  // const events = db.child('codingbootcamp-6a8d8');
  // const query = events
  //                       .orderByChild('dealId')
  //                       .equalTo('4106722')
  //                       .limitToFirst(5)
  
  // query.on('value', snap => {
  //   console.log(this);
  // });

  

// const eventsRef = db.child('events');
// const querydb = eventsRef.orderFunction().queryFunction();
// const querydbten = eventsRef.orderByKey().limitToFirst(10);

// console.log(querydb);
// console.log(querydbten);

// database.ref().once('value').then(function(snapshot){
//   var snapArray = Object.values(snapshot.val());
//   console.log(snapArray);
//   });

    //look for deal id in firebase
    //if the deal is in the database then increment the favorite count by 1

    //if the deal is NOT in the database then add the deal to the database

    // database.ref().push({
    //   merchantId: merchant,
    //   dealId: deal, 
    //   favoriteCount: count
    // });

});


