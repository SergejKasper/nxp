define(function() {
	'use strict';

	IndexPageController.$inject = [ '$scope' ];
	function IndexPageController($scope) {
		$scope.subnav = {
			"menupoints" : [ {
				"name" : "Alle Events",
				"url" : "#"
			}, {
				"name" : "Meine Events",
				"url" : "#"
			}, {
				"name" : "Neues Event",
				"url" : "#/newActivity"
			} ],
			"dropdown" : []
		};

		$scope.slides = [ {
			"title" : "Die NXP ist zurück",
			"subtitle" : "bald ist es soweit"
		}, {
			"title" : "Die letzte NXP war legendär",
			"subtitle" : "wir setzen einen drauf"
		}, {
			"title" : "Du bist gefragt",
			"subtitle" : "gestallte unsere Party"
		}, {
			"title" : "Deine Stimme zählt",
			"subtitle" : "wähle die Getränke"
		}, {
			"title" : "Beteilige dich vor Ort",
			"subtitle" : "wähle die Songs"
		}, {
			"title" : "Sei Teil des Rahmenprogramms",
			"subtitle" : "Plane deinen Abend!"
		}, {
			"title" : "Interessiert?!",
			"subtitle" : "Anmelden und Los!"
		} ];
	}
});