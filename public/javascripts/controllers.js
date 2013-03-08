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
		"name" : "Dance Battle",
		"description" : "Legendary Awesomeness ahead!"
	}, {
		"name" : "Wer zuerst kommt...",
		"description" : "Some awesome Party Activity"
	}, {
		"name" : "Songvote",
		"description" : "Even more awesome Party Activity"
	}, {
		"name" : "Partyshots",
		"description" : "The most awesome Party Activity since genesis!"
	}, {
		"name" : "Poker warmup",
		"description" : "..And the party goes on!"
	}, {
		"name" : "Social Star",
		"description" : "Can you handle this ?!"
	}, {
		"name" : "Party non stop",
		"description" : "Showdown!"
	}, {
		"name" : "Vorglühen",
		"description" : "Bigtime finish!"
	}, {
		"name" : "Networker",
		"description" : "Afterparty!"
	} ];

}

function DetailController($scope) {

}