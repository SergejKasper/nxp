'use strict';

/* Directives */
define(["lib/jquery/audioplayer"],function(){
	var playerelement = function($parse, $timeout) {
	return {
		restrict : 'AC',
		scope : true,
		replace : false,
		template : '<audio preload="none" controls loop>'
				+ '<source src="assets/media/Barthezz-Infected.mp3"/>'
				+ '<source src="assets/media/Barthezz-Infected.ogg"/>'
				+ '</audio>',
		link : function(scope, elem, attrs) {
			elem.ready(function() {
				window.onload = elem.children('audio').audioPlayer();
			});
		}
	};

};

return playerelement;
});