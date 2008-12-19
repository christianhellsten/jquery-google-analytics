/*
* jquery-google-analytics plugin
*
* Copyright (c) 2008 Christian Hellsten
*
* Plugin homepage:
* http://aktagon.com/projects/jquery/google-analytics/
* http://github.com/christianhellsten/jquery-google-analytics/
*
* Examples:
* http://aktagon.com/projects/jquery/google-analytics/examples/
*
* Repository:
* git://github.com/christianhellsten/jquery-google-analytics.git
*
* Version 1.0.0
*
* Tested with:
* Mac: Firefox 3
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
*/

(function($) {
	$.fn.track = function(options) {
		
		var element = $(this);
		
        // Prevent link from being tracked multiple times 
        if (element.hasClass("tracked")) {
            return;
        }

 		element.addClass("tracked");

    	// Add click handler to all matching elements
    	return this.each(function() {
			var link	 = $(this);

			// Use default options, if necessary
			var settings = $.extend({}, $.fn.track.defaults, options);

			var category = evaluate(link, settings.category);
			var action   = evaluate(link, settings.action);
			var label    = evaluate(link, settings.label);
			var value    = evaluate(link, settings.value);
			
			var message  = "category:'" + category + "' action:'" + action + "' label:'" + label + "' value:'" + value + "'";
			
			debug('Tracking ' + message);

			link.click(function() {				
				debug('Clicked ' + message);
				
				if(typeof pageTracker == 'undefined') {
					// alert('You need to install the Google Analytics script'); blocked by whatever
				} else {
					pageTracker._trackEvent(category, action, label, value);
				}
				return true;
			});
		});
		
		function debug(message) {
			if(typeof console != 'undefined') {
				console.debug(message);
			}			
		};
		
		function evaluate(element, text_or_function) {
			if(typeof text_or_function == 'function') {
				text_or_function = text_or_function(element);
			}
			return text_or_function;
		};
    };

	// Default (overridable) settings
	$.fn.track.defaults = {
		category 	: 'link',
		action   	: 'click',
		label		: function(element) { return element.attr('href') },
		value 		: null
	};
})(jQuery);
