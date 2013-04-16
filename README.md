jquery-latitude-longitude-picker-gmaps
======================================

A jQuery plugin that creates a location picker on your webpage using Google Maps. 

Supports multiple maps. Works on touchscreen. Easy to customize markup and CSS. 

To see a live demo, go to:
http://www.wimagguc.com/projects/jquery-latitude-longitude-picker-gmaps/


CHANGES
=======

- Reverse lookup: after you move a marker, the location's name will be retrieved by the picked lat/lng values


MORE INFO
=========

- After every position change you'll have the fresh lattitude, longitude and zoom values in the hidden fields
- The "location_changed" event will also be fired with the gllLatlonPicker Node JQuery object as attribute

With search field:
- If the search has results, the first element will appear on the map (with the default zoom value 11)
- You can set default latitude, longitude and zoom values in the hidden fields
- If you don't give an ID to the map, the script generates one; feel free to use custom ID's though

With reverse lookup:
- To disable it, set queryLocationNameWhenLatLngChanges to false among the params 
- After the position change you'll have the location name in the gllpLocationName field
- If there is no value, the field will be emptied
- The "location_changed" event will also be fired with the gllLatlonPicker Node JQuery object as attribute

With latitude, longitude and zoom fields:
- You can set your own latitude, longitude and zoom values. The map shows your data after pressing the update button.
- You can still hide the Zoom field (or any other fields)


INSTALL
=======

Import jQuery and Google Maps:
````
<script src="js/jquery-1.7.2.min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
````

Import the plugin:
````
<link rel="stylesheet" type="text/css" href="css/jquery-gmaps-latlon-picker.css"/>
<script src="js/jquery-gmaps-latlon-picker.js"></script>
````

Add a HTML markup:
````
<fieldset class="gllpLatlonPicker">
	<input type="text" class="gllpSearchField">
    <input type="button" class="gllpSearchButton" value="search">
	<div class="gllpMap">Google Maps</div>
	<input type="hidden" class="gllpLatitude" value="20"/>
	<input type="hidden" class="gllpLongitude" value="20"/>
	<input type="hidden" class="gllpZoom" value="3"/>
</fieldset>
````
(See more options in the demo.html)


LICENSE
=======

Do with the code whatever you please.

This code uses the jQuery Javascript library and the Google Maps API. To read more about these, go to:
http://jquery.com/
https://developers.google.com/maps/


ABOUT
=====

Richard Dancsi

- Blog: http://www.wimagguc.com/
- Twitter: http://twitter.com/wimagguc
- Linkedin: http://linkedin.com/in/richarddancsi
- Google+: https://plus.google.com/u/0/115939246085616544919
