//
// jQuery Dynamic Truncate 1.0 Beta (14 Maj 2010)
// http://github.com/xiplias/jquery.dynamic_truncate
//
// Tested with 1.4.2
//   
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
//
// Created by Anders Hansen
//

(function($) {
  $.dynamic_truncate = function(th, options) {
    var t = this;
    var truncate_target = $(th).find(".dtc_text");
    var cache = truncate_target.html();

    t.truncate(th, truncate_target, cache, options);

    $(window).bind("smartresize", function(event) {
      t.truncate(th, truncate_target, cache, options);
    });
  };
  
  $.extend($.dynamic_truncate.prototype, {
    truncate: function(th, truncate_target, cache, options) {
      width = $(th).width();
      perserves = $(th).find(".dtc_perserve");

      if(perserves.length > 0) {
        perserves.each(function() {
          width = width - $(this).width();
        });
      }

      chars_pr_width = width / options.px_pr_char
      truncate_target.html(cache.substring(0, chars_pr_width));

      if(cache.length > chars_pr_width) {
        truncate_target.html(truncate_target.html()+"..");
      }
    }
  });

  $.fn.dynamic_truncate = function(options) {
  	options = $.extend({
      px_pr_char: 7.1
  	},options);
    
  	this.each(function() {
  	  new $.dynamic_truncate(this, options);
  	});
  	
  	return this;
  };
})(jQuery);

/*!
 * smartresize: debounced resize event for jQuery
 *
 * Copyright (c) 2009 Louis-Rémi Babé
 * Licensed under the GPL license.
 * http://docs.jquery.com/License
 *
 */
(function($) {

var event = $.event,
	resizeTimeout;

event.special[ "smartresize" ] = {
	setup: function() {
		$( this ).bind( "resize", event.special.smartresize.handler );
	},
	teardown: function() {
		$( this ).unbind( "resize", event.special.smartresize.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		// set correct event type
        event.type = "smartresize";

		if(resizeTimeout)
			clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			jQuery.event.handle.apply( context, args );
		}, execAsap === "execAsap"? 0 : 100);
	}
}

$.fn.smartresize = function( fn ) {
	return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
};

})(jQuery);