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
2. User starts typing in location and the Google places autocomplete API senses the user input, then provides suggestions on locations that match the user's input characters.
3. User selects a location from autocomplete suggestions or finishes typing in the location manually.
4. User presses SEARCH button when both fields are successfully filled, standard browser form validation is employed to warn the user that fields need to be filled out before proceeding if the user presses search before both fields are filled.
4. Search button is connected to an On-Click function that will kick off the following:
    a) User location (address) is submitted to Geolocation to get latitude & longitude
    b) User address and search term are submitted to the Sqoot API to retrieve deals based on those parameters
5. Sqoot API request sent using AJAX and response is parsed into two array, one called 'items' that contains information about the latitude and longitude for all th merchants contained in the response and one called 'xxx' that contains all the relevant detailed information about the deal (deal description, discount amount, original value, merchant name, etc).
6. Google Maps API request is made containing the user's latitude and longitude (var userLatLng) and the items array from Sqoot to display a map centered on the user's input geolocation and a set of markers illustrating the deal merchants location.
    Sample Array
    userLatLng [{userLat, userLn}]
    items = [{merchantName1, merchantLatitude1, merchantLongitude1}, {merchantName2, merchantLatitude2, merchantLongitude2}]
7. User can see the relevant deals from their request in a deals summary table (created using JQuery within the AJAX response)
8. User can click on the merchant name in the deals summary table and the top input form box will be replaced with a view displaying deal details.
9. User will see a map to the right of the deal details showing a marker indicating the user's location, a marker indicating the merchant's location, and directions between the two.
10. User can click on the heart icon next to the merchant name in the detailed deals view and that deal will be saved in Firebase as a favorite deal

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


