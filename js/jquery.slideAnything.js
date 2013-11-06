/*
	slideAnything jQuery plugin v1.0
	Creates a carousel or slider type animation for any html content without
	restrictions. The container can be changed to any size including full screen.
	Copyright 2013 José Gleiser
	Released under MIT License.
*/
(function($) {

	$.fn.slideAnything = function( options ) {

		var settings = $.extend( {}, $.fn.slideAnything.defaults, options );
		
		var slideAnythingFunc = function ($jsa_wrapper, $click) {
			var
				$active = $jsa_wrapper.find('.jsa-slider-content.active'),
				$next = $active.next('.jsa-slider-content'),
				$clicked,
				clicked;

			// Change slide by click
			if ($click) {
				clicked = $click.attr('href');
				$clicked = $jsa_wrapper.find(clicked).parent();
				if (0===$active.find(clicked).length) {
					$active.toggleClass('active', settings.toggleSpeed);
					$clicked.toggleClass('active', settings.toggleSpeed);
					$click.parent().find('.icon-change-slide').removeClass('active');
					$click.find('.icon-change-slide').addClass('active');
				}
			// Go to next slide on timer
			} else {
				if (0===$next.length) {
					$next = $active.siblings(':first');
				}
				$active.toggleClass('active', settings.toggleSpeed);
				$next.toggleClass('active', settings.toggleSpeed);
				$jsa_wrapper.find('.jsa-controls').find('.icon-change-slide').removeClass('active')
				.end().find('a[href=#' + $next.children().attr('id') + ']')
				.find('.icon-change-slide').addClass('active');
			}
		};

		return this.each(function() {
			var
				$jsa_wrapper = $(this),
				interval = settings.timerSpeed,
				timer = setInterval(function() {
					slideAnythingFunc($jsa_wrapper);
				}, interval);
			$jsa_wrapper.on('click', '.jsa-controls a', function(e) {
				e.preventDefault();
				slideAnythingFunc($jsa_wrapper, $(this));
				clearInterval(timer);
				timer = setInterval(function() {
					slideAnythingFunc($jsa_wrapper);
				}, interval);
			});
		});

	};

	$.fn.slideAnything.defaults = {
		timerSpeed: 2000,
		toggleSpeed: 300,
	};

}(jQuery));
