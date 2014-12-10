/*
 * Pixxeledge jQuery Slider v.1.0
 * Author: Ruel Mindo
 * http://www.pixxeledge.com
 */

(function ($) {
    $.fn.edge_slider = function (opt) {
		
			var sc  = 1, nc  = 1;

            var defaults = {
				control			: true,
				show_control	: true,
				duration		: 1000,
				time_interval	: 5000,
				slide_type		: 'slide',
			};

			var set = $.extend({}, defaults, opt);

			$slider = $(this);

			$slider.find('.slides').wrapAll('<div class="frame"/>');

			if( set.control ) {
				$( '<span class="control prev"></span>' ).insertBefore( $slider.find('.frame') );
				$( '<span class="control next"></span>' ).insertAfter(  $slider.find('.frame') );	
			}


			$slides 	 = $slider.find('.slides');
			$control 	 = $slider.find('.control');
			$navigation  = $slider.find('.navigation');
			$nav_items	 = $slider.find($navigation).children('a');
			$slide_items = $slider.find($slides).children('li');


			width 		 = $slider.outerWidth();
			height		 = $slider.outerHeight();
			items 		 = $slide_items.length;
			first_height = $slide_items.first().outerHeight();
			total_width  = items * width;
		
			

			$slide_items.first().addClass('active');
			$nav_items.first().addClass('active');
			
			$($navigation).css({ 'width' : $nav_items.outerWidth() * $nav_items.length });
			
			
			$slide_items.each(function(){ 
				$(this).attr( 'id', sc ); 
				sc++; 
			});
			
			
			$nav_items.each(function(){ 
				$(this).attr( 'id', nc ); 
				nc++; 
			});
			
			
			$slider.css( 'position', 'relative' );

			
			if( set.slide_type !== 'dock' ){
				$slides.parent().css({ 
					'width'		: width,
					'height'	: height,
					'overflow'	: 'hidden',
					'position'	: 'relative'					
				});
				$slide_items.css({ 
					'width' : width, 
					'float' : 'left'
				});
			}
			if( set.slide_type == 'fade' ){
				$slide_items.fadeOut();
				$slide_items.first().fadeIn();				
				$slide_items.css({
					'position'	: 'absolute',
				});
			}
			if( set.slide_type == 'slide' ){				
				$slides.css({
					'position'	: 'relative',
					'width'		: total_width,
				});
			}


			/* Show Next and Prev Control */
			if( set.show_control == false ) {

				$control.hide();

				$(this).parent().hover(function() {
					$control.fadeIn('slow');
				}, function(){
					$control.fadeOut('slow');
				});				
			}


			function edge_slides( active ){
				/* Active */
				var active_item = $slides.find('li.active');

				/* Next and Prev Item */
				var next_slide  = active_item.next();
				var prev_slide  = active_item.prev();
				
				/* Item Outer Height */
				var next_height = active_item.next().outerHeight();
				var prev_height = active_item.prev().outerHeight();
			
			
				if( active ) {
					if ( active.hasClass('next') ) {
						active = next_slide;							
					} 
					if ( active.hasClass('prev') ) {
						active = prev_slide;
					}
				} else {
					active = next_slide;
				}

				if( active.length === 0 ) {
					active = $slide_items.first();
				}

				
				i = active.attr('id');
							
				
				$slide_items.removeClass('active');				
				$nav_items.removeClass('active');
				
				active.addClass('active');
				
				if( set.slide_type !== 'dock' ){
					if( set.slide_type == 'fade' ){
						/* fadeOut */
						$slide_items.removeClass('active').fadeOut();
						/* fadeIn */
						$slide_items.eq(i - 1).addClass('active');
					} else {
						$slide_items.eq(i - 1).addClass('active').parent().animate({marginLeft: - ( i - 1 ) * width }, set.duration, 'easeOutQuint');
					}
				} else {
					$slides.animate({ marginLeft: -i * width });
				}
			}
			
			
			/* Navigation Control */
			$nav_items.click(function(e) {	
				e.preventDefault();

				clearInterval(interval);
				edge_slides( $(this) );

				return false;
			});	
			
			/* Navigation Next and Previous Control */
			$control.click(function(e){
				e.preventDefault();
				clearInterval(interval);
				edge_slides($(this));
				return false;
			});
			
			/* Stop when hovering the slides */
			$slider.mouseover(function() {
				clearInterval(interval);
			}).mouseout(function(){
				edge_cycle();
			})
						
			
			
			/* Set interval */
			var interval;
			
			function edge_cycle(){
				interval = setInterval(function(){ 
					edge_slides(); 
				}, set.time_interval );
			}
			edge_cycle();
			
    }
})(jQuery);
