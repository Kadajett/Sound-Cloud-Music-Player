'use strict';

/**
 * @ngdoc service
 * @name musicPlayerApp.player
 * @description
 * # player
 * Service in the musicPlayerApp.
 */
angular.module('musicPlayerApp')
  .service('player', function player($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var player = this;

    player.init = function(){
    	// https://api.soundcloud.com/tracks?client_id=YOUR_CLIENT_ID
    	player.getTracks()
    	.then(function(res){
    		player.playList = player.formatTracks(res);
    	})
    }

    player.formatTracks = function(tracks){
    	var newArray = [];
    	angular.forEach(tracks, function(track){
    		if(track.streamable){
    			newArray.push({
    			src: track.stream_url + '?client_id=f450934db7fc221db76648ea6d02b741',
    			type: 'audio/' + track.original_format,
    			originalFormat: angular.copy(track)
    		})
    		}
    		
    	})

    	return newArray;
    }

    player.getTracks = function(query){
    	var defer = $q.defer()

    	$http.get('https://api.soundcloud.com/tracks?client_id=f450934db7fc221db76648ea6d02b741&filter=streamable&q=' + (query || ' '))
    	.success(function(res){
    		player.playList = player.formatTracks(res)
    		defer.resolve(res);
    	})
    	.error(function(err){
    		defer.reject(err);
    	})

    	return defer.promise;
    }

    player.init();

    return player;
  });
