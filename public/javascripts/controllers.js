'use strict';

/* Controllers */

function IndexPageController($scope) {
	$scope.subnav = {
		"menupoints" : [ {
			"name" : "Alle Events",
			"url" : "#"
		}, {
			"name" : "Meine Events",
			"url" : "#"
		},
		{
			"name" : "Community Events",
			"url" : "#"
		}
		],
		"dropdown" : []
	};
	
	$scope.slides = [
	{"title" : "Die NXP ist zurück", "subtitle": "bald ist es soweit"},
	{"title" : "Die letzte NXP war legendär", "subtitle": "wir setzen einen drauf"},
	{"title" : "Du bist gefragt", "subtitle": "gestallte unsere Party"},
	{"title" : "Deine Stimme zählt", "subtitle": "wähle die Getränke"},
	{"title" : "Beteilige dich vor Ort", "subtitle": "wähle die Songs"},
	{"title" : "Sei Teil des Rahmenprogramms", "subtitle": "Plane deinen Abend!"},
	{"title" : "Interessiert?!", "subtitle": "Anmelden und Los!"}
	];
}

function ActivityListController($scope) {
	$scope.activities = [ {
		"name" : "activityOne",
		"description" : "Legendary Awesomeness ahead!"
	}, {
		"name" : "activity2",
		"description" : "Some awesome Party Activity"
	}, {
		"name" : "activity3",
		"description" : "Even more awesome Party Activity"
	}, {
		"name" : "activity4",
		"description" : "The most awesome Party Activity since genesis!"
	}, {
		"name" : "activity5",
		"description" : "..And the party goes on!"
	}, {
		"name" : "activity6",
		"description" : "Can you handle this ?!"
	}, {
		"name" : "activity7",
		"description" : "Showdown!"
	}, {
		"name" : "activity8",
		"description" : "Bigtime finish!"
	}, {
		"name" : "activity9",
		"description" : "Afterparty!"
	} ];

}

function DetailController($scope) {

}