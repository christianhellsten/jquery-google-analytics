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
* Mac: Firefox Firefox 3
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
*/

(function($) {
	$.fn.trackClick = function(options) {
		
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
			var settings = $.extend({}, $.fn.trackClick.defaults, options);

			var href 	 = link.attr('href');
			var category = evaluate(link, settings.category);
			var event    = evaluate(link, settings.event);
			var label    = href;

			debug('Tracking ' + href);

			link.click(function() {				
				debug("Clicked category:'" + category + "' event:'" + event + "' href:'" + href + "'");
				
				if(typeof pageTracker == 'undefined') {
					// alert('You need to install the Google Analytics script'); blocked by whatever
				} else {
					pageTracker._trackEvent(category, event, href);
				}
				return false;
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
	$.fn.trackClick.defaults = {
		category : 'outgoing',
		event    : 'event'
	};
})(jQuery);
