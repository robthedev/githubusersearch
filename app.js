var searchModule = (function(){
	"use strict";

	var api = {};
    //cache DOM Elements
    var $main_el = $('#results');
    var $user_input = $main_el.find('#userinput');
    var $search_button = $main_el.find('#search');
    var $clear_button = $main_el.find('#clear');
    var $user_block = $main_el.find('#user');
    var $clear_block = $main_el.find('#clear_block');
    var template = $main_el.find('#user-template').html();

    function init () {
		setupUI();
		bindUI();
    }

     function setupUI () {
   		$user_input.focus();
    }

    function bindUI () {
    	$search_button.on('click', getResults);
    	$clear_button.on('click', clearEverything);
    }

    function displayError (msg) {
    	$user_block.append($('<div>',{id:'error_id', text: msg }));
		$search_button.attr("disabled","disabled");
    	setTimeout(function(){ 
               location.reload(); 
           }, 1000);
    }

    function getResults () {
	var username = $.trim($user_input.val());
	var clean_username = username.replace(/\s+/g, '');
	$.ajax({
    	url : "https://api.github.com/search/users?q=" + clean_username,
    	type: "GET",
    	dataType : "json",
    	success : function (data) {

    		if (data.total_count <= 0) {
    			displayError('Invalid User...');
    		}

    		var user_img = data.items[0].avatar_url;
            var user_id = data.items[0].login;
            var user_page = data.items[0].html_url;

            $user_block.addClass('frame');
    		 
    		$user_block.append($('<img>',{id:'github_img', src: user_img }));
      		$user_block.append($('<div>',{id:'github_id', text: user_id }));
            $user_block.append($('<a>',{id:'github_link', text: 'Github Page', href: user_page }));
            $clear_block.append($('<a>',{id:'clear', class: 'btn', text: 'Clear Results', href: '' }));

            clearInput();
            $search_button.attr("disabled","disabled");
            
     	},
     	error :function (error, status, xhr) {
     		displayError('Error: please try again...');
     	} 
     });
	
	}

	function clearEverything () {
		clearInput();
		$user_block.html('');
	}

	function clearInput () {
		$user_input.val('');
	}

    return {
    	init: init
    };


})();

searchModule.init();
