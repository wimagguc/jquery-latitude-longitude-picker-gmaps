/**
 * 	
 * A JQUERY GOOGLE MAPS LATITUDE AND LONGITUDE LOCATION PICKER 
 * 
 * Supports multiple maps. Easy to customize markup and CSS.
 * 
 * To see a live demo, go to:
 * http://wimagguc.hu/projects/jquery-latitude-longitude-picker-gmaps/
 * 
 * by Richard Dancsi
 * http://wimagguc.hu/
 * 
 */

var GMapsLatLonPicker = (function() {

	var _self = this;

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PARAMETERS (MODIFY THIS PART) //////////////////////////////////////////////////////////////
	_self.params = {
		defLat : 0,
		defLng : 0,
		defZoom : 1,
		mapOptions : {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			disableDoubleClickZoom: true,
			zoomControlOptions: true,
			streetViewControl: false
		},
		strings : {
			markerText : "Drag this Marker", 
			error_empty_field : "Couldn't find coordinates for this place",
			error_no_results : "Couldn't find coordinates for this place"
		}
	};


	///////////////////////////////////////////////////////////////////////////////////////////////
	// VARIABLES USED BY THE FUNCTION (DON'T MODIFY THIS PART) ////////////////////////////////////
	_self.vars = {
		ID : null,
		LATLNG : null,
		map : null,
		marker : null,
		geocoder : null
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PRIVATE FUNCTIONS FOR MANIPULATING DATA ////////////////////////////////////////////////////
    var setPosition = function(position) {
    	_self.vars.marker.setPosition(position);
		_self.vars.map.panTo(position);

		$(_self.vars.cssID + ".gllpZoom").val( _self.vars.map.getZoom() );
		$(_self.vars.cssID + ".gllpLongitude").val( position.lng() );
		$(_self.vars.cssID + ".gllpLatitude").val( position.lat() );
		
		$(_self.vars.cssID).trigger("location_changed", $(_self.vars.cssID));
    };

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PUBLIC FUNCTIONS  //////////////////////////////////////////////////////////////////////////
	var publicfunc = {

		// INITIALIZE MAP ON DIV //////////////////////////////////////////////////////////////////
		init : function(object) {
			
			if ( !$(object).attr("id") ) {
				if ( $(object).attr("name") ) {
					$(object).attr("id", $(object).attr("name") );
				} else {
					$(object).attr("id", "_MAP_" + Math.ceil(Math.random() * 10000) );
				}
			}

			_self.vars.ID = $(object).attr("id");
			_self.vars.cssID = "#" + _self.vars.ID + " ";

			_self.params.defLat  = $(_self.vars.cssID + ".gllpLatitude").val()  ? $(_self.vars.cssID + ".gllpLatitude").val()        : _self.params.defLat;
			_self.params.defLng  = $(_self.vars.cssID + ".gllpLongitude").val() ? $(_self.vars.cssID + ".gllpLongitude").val()       : _self.params.defLng;
			_self.params.defZoom = $(_self.vars.cssID + ".gllpZoom").val()      ? parseInt($(_self.vars.cssID + ".gllpZoom").val())  : _self.params.defZoom;
			
			_self.vars.LATLNG = new google.maps.LatLng(_self.params.defLat, _self.params.defLng);

			_self.vars.MAPOPTIONS        = _self.params.mapOptions;
			_self.vars.MAPOPTIONS.zoom   = _self.params.defZoom;
			_self.vars.MAPOPTIONS.center = _self.vars.LATLNG; 

			_self.vars.map = new google.maps.Map($(_self.vars.cssID + ".gllpMap").get(0), _self.vars.MAPOPTIONS);
			_self.vars.geocoder = new google.maps.Geocoder();

			_self.vars.marker = new google.maps.Marker({
				position: _self.vars.LATLNG,
				map: _self.vars.map,
				title: _self.params.strings.markerText,
				draggable: true
			});

			// Set position on doubleclick
			google.maps.event.addListener(_self.vars.map, 'dblclick', function(event) {
		    	setPosition(event.latLng);
		    });
		
			// Set position on marker move
		    google.maps.event.addListener(_self.vars.marker, 'dragend', function(event) {
		    	setPosition(_self.vars.marker.position);
		    });
	
			// Set zoom feld's value when user changes zoom on the map
			google.maps.event.addListener(_self.vars.map, 'zoom_changed', function(event) {
				$(_self.vars.cssID + ".gllpZoom").val( _self.vars.map.getZoom() );
				$(_self.vars.cssID).trigger("location_changed", $(_self.vars.cssID));
		    });

			// Update location and zoom values based on input field's value 
			$(_self.vars.cssID + ".gllpUpdateButton").bind("click", function() {
				var lat = $(_self.vars.cssID + ".gllpLatitude").val();
				var lng = $(_self.vars.cssID + ".gllpLongitude").val();
				var latlng = new google.maps.LatLng(lat, lng);
				_self.vars.map.setZoom( parseInt( $(_self.vars.cssID + ".gllpZoom").val() ) );
				setPosition(latlng);
			});
		
			// Try to get  
			$(_self.vars.cssID + ".gllpSearchButton").bind("click", function() {
				if ($(_self.vars.cssID + ".gllpSearchField").val() == "") {
					alert( _self.params.strings.error_empty_field );
					return;
				}
				_self.vars.geocoder.geocode(
					{"address": $(_self.vars.cssID + ".gllpSearchField").val() },
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							$(_self.vars.cssID + ".gllpZoom").val(11);
							_self.vars.map.setZoom( parseInt($(_self.vars.cssID + ".gllpZoom").val()) );
							setPosition( results[0].geometry.location );
						} else {
							alert( _self.params.strings.error_no_results );
						}
					});
			});

		}

	}
	
	return publicfunc;
});


$(document).ready( function() {
	$(".gllpLatlonPicker").each(function() {
		(new GMapsLatLonPicker()).init( $(this) );
	});
});

$(document).bind("location_changed", function(event, object) {
	console.log("changed: " + $(object).attr('id') );
	
	
});
