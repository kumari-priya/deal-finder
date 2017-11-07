Edited for pull request
---

Synopsis
---
The deal finder site utilizes Sqoot API and Google Maps APIs to show a user all deals in the search category that are relevant to their search location.

Contributers
---
Abhishek Nanduri
ananduri92@gmail.com

Amy Slover
amykslover@gmail.com

Sameen Babar
sameen63@gmail.com

Priya Kumari
priya@goel.pw


Location
---
https://kumari-priya.github.io/project1/

Application Data Flow
---
1. User enters in search term (category of deal they want to find)
![Alt text](/assets/img/Group_Project_Home.png?raw=true "Home Screen")
2. User starts typing in location and the Google places autocomplete API senses the user input, then provides suggestions on locations that match the user's input characters.
![Alt text](/assets/img/Group_Project_Autocomplete.png?raw=true "Autocomplete")
3. User selects a location from autocomplete suggestions or finishes typing in the location manually.
4. User presses SEARCH button when both fields are successfully filled, standard browser form validation is employed to warn the user that fields need to be filled out before proceeding if the user presses search before both fields are filled.
![Alt text](/assets/img/Group_Project_Search.png?raw=true "Ready to Search")
4. Search button is connected to an On-Click function that will kick off the following:
    a) User location (address) is submitted to Geolocation to get latitude & longitude
    b) User address and search term are submitted to the Sqoot API to retrieve deals based on those parameters
5. Sqoot API request sent using AJAX and response is parsed into two array, one called 'items' that contains information about the latitude and longitude for all th merchants contained in the response and one called 'xxx' that contains all the relevant detailed information about the deal (deal description, discount amount, original value, merchant name, etc).
6. Google Maps API request is made containing the user's latitude and longitude (var userLatLng) and the items array from Sqoot to display a map centered on the user's input geolocation and a set of markers illustrating the deal merchants location.
    Sample Array
    userLatLng [{userLat, userLn}]
    items = [{merchantName1, merchantLatitude1, merchantLongitude1}, {merchantName2, merchantLatitude2, merchantLongitude2}]
7. User can see the relevant deals from their request in a deals summary table (created using JQuery within the AJAX response)
![Alt text](/assets/img/Group_Project_SearchResults.png?raw=true "Main Deals Table")
8. User can click on the merchant name in the deals summary table and the top input form box will be replaced with a view displaying deal details.
![Alt text](/assets/img/Group_Project_DetailView1.png?raw=true "Deals Detailed View 1")
9. User will see a map to the right of the deal details showing a marker indicating the user's location, a marker indicating the merchant's location, and directions between the two.
![Alt text](/assets/img/Group_Project_DetailView2.png?raw=true "Deals Detailed View 2")
10. User can click on the heart icon next to the merchant name in the detailed deals view and that deal will be saved in Firebase as a favorite deal
![Alt text](/assets/img/Group_Project_Favorited.png?raw=true "Click the Heart to Save a Favorite Deal")

Application is mobile responsive:
![Alt text](/assets/img/DealFinder_Responsive.png?raw=true "Responsive")


API References
---

Sqoot Deals API
http://docs.sqoot.com/v2/deals.html

Google Maps
https://developers.google.com/maps/documentation/javascript/tutorial

Google Maps Directions
https://developers.google.com/maps/documentation/directions/start

Google Geolocation
https://developers.google.com/maps/documentation/geolocation/intro

Google Places Autocomplete
https://developers.google.com/maps/documentation/javascript/places-autocomplete
