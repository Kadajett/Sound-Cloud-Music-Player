'use strict';

/**
 * @ngdoc function
 * @name musicPlayerApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('PlayerCtrl', function ($scope, $interval, player, $rootScope) {
     $scope.playing = false;

    $scope.playerService = player;
    

    $scope.attachPlayer = function(){
    	$scope.audio1 = $rootScope.audio1;
    }
    /* 

[
  { src: '/sounds/chicago.mp3', type: 'audio/mp3', song: 'Chicago', writer: 'Sujfan Stefens'},
  { src: '/sounds/chicago.mp3', type: 'audio/mp3' },
  { src: '/sounds/chicago.mp3', type: 'audio/mp3' },
  { src: '/sounds/chicago.mp3', type: 'audio/mp3' }
]
    */

    $scope.song = {writer:'Sujfan Stefens', song:'Chicago'}
    
    $scope.toggleSongList = function(){
    	$scope.showImage = !$scope.showImage;
    }

    $scope.volumeShow = false;

    $scope.mute = function(){
    	$scope.audio1.toggleMute();
    }
    $scope.showVolume = function(){
    	$scope.volumeShow = !$scope.volumeShow;
    }
    $scope.prevSong = function(){
    	$scope.audio1.prev();
    }
    $scope.nextSong = function(){
    	$scope.audio1.next();
    }
    $scope.updateVolume = function(){
    	$scope.audio1.setVolume($scope.volume);
    }
    $interval(function(){
    	// $scope.audio1.setVolume($scope.volume);
    	$scope.currentTime = (document.getElementById('player').currentTime / document.getElementById('player').duration * 100);
    	if($scope.audio1){
    		if($scope.audio1.playing){
	    		$scope.playing = true;
	    	}
	    	else{
	    		$scope.playing = false;
	    	}
    	}
    	
    }, 1000)

    $scope.pause = function(){
    	$scope.playing = !$scope.playing;
    	if($scope.playing){
    		$scope.audio1.play();
    	}
    	else{
    		$scope.audio1.pause();
    	}

    	// $scope.currentTime = (document.getElementById('player').currentTime / document.getElementById('player').duration * 100);
    }
  });
