"use strict";

$(document).ready(function() {
    
    // Set the username of the Instagram account. This must be a public account.
	var instagramAccountName = "instaapiaccount95";
	
	$.ajax({
	url:'https://www.instagram.com/' + instagramAccountName + '?__a=1',
	type:'get',
	success:function(response){
		
		/*------------------------------------*\
		    Bio Section
		\*------------------------------------*/
		
		// Add the profile photo, title and alt
	  	$('.bio-section-image').attr('src',response.graphql.user.profile_pic_url).attr('title', response.graphql.user.full_name).attr('alt', response.graphql.user.full_name);
	  	
	  	// Add the profile full name
	  	$('.bio-section-full-name').text(response.graphql.user.full_name);
	  	
	  	// Add the number of posts, followers and following
	  	$('.bio-section-posts').html('<b>' + statsFormatter(response.graphql.user.edge_owner_to_timeline_media.count) + '</b> posts');
	  	$('.bio-section-followers').html('<b>' + statsFormatter(response.graphql.user.edge_followed_by.count) + '</b> followers');
	  	$('.bio-section-following').html('<b>' + statsFormatter(response.graphql.user.edge_follow.count) + '</b> following');
	  
	  	// Add the full username
	  	$('.bio-section-username').html('<b>' + response.graphql.user.full_name + '</b>');
	
	  	// Add the biography description
		$('.bio-section-biography').text(response.graphql.user.biography);	
		
		/*------------------------------------*\
		    Image Section
		\*------------------------------------*/
		
		// Add Instagram account link to the icon
		$('.image-section-link').attr('href', 'https://www.instagram.com/' + response.graphql.user.username + '/');
		
		// Create a shortcut to the image section of the JSON data
		var posts = response.graphql.user.edge_owner_to_timeline_media.edges;
		
		// Create a variable for the posts HTML and counter
		var postsHTML = '';
		var counter;
		
		// Set the maximum number of images shown by default
		var maxPosts = 4;
		
		// Loop through each of the posts
		for(counter=0;counter<maxPosts;counter++){
		
			// Get the post shortcode used in the post url on Instagram
			var postShortcode = posts[counter].node.shortcode	
		
			// Get the post image URL
			var postImage = posts[counter].node.display_url;
			
			// Get the post likes count
			var postLikes = posts[counter].node.edge_liked_by.count;
			
			// Get the post comments count
			var postComments = posts[counter].node.edge_media_to_comment.count;
			
			// Create the post image container
			postsHTML += '<div class="image-section-image">';
			
			// Create the link to the Instagram post
			postsHTML += '<a href="https://www.instagram.com/p/' + postShortcode +'/" target="_blank">';
			
			// Create the post background image
			postsHTML += '<div class="image-section-image-inner bg-cover" style="background-image: url(' + postImage +')">';
			
			// Create a semi-transparent overlay that will get shown on hover
			postsHTML += '<div class="image-section-bg-overlay"></div>';
			
			// Create the post icons container
			postsHTML += '<div class="image-section-icons-overlay">';
			
			// Set the post icon in the vertical centre of image area
			postsHTML += '<div class="outer-cell">';
			postsHTML += '<div class="inner-cell">';
			
			// Get the post comment and like count
			postsHTML += statsFormatter(postLikes) + ' <i class="fas fa-heart"></i> ' + statsFormatter(postComments) + ' <i class="fas fa-comment"></i>';
			
			postsHTML += '</div>'; // close inner-cell
			postsHTML += '</div>'; // close outer-cell
			
			postsHTML += '</div>'; // close image-section-icons-overlay
			
			postsHTML += '</div>'; // close image-section-image-inner
			
			postsHTML += '</a>';
			
			postsHTML += '</div>'; // close image-section-image
	    
	  	}
	
	  	// Append the post content to the existing image grid div
	  	$('.image-section-grid-section').html(postsHTML);
	  	
	  	// Set Height of Image to Equal Width
	  	resizeImageHeight();
	  	
	  	// Display the full JSON response from Instagram, so the full list of available data can be viewed. You should remove this before going live as this should only be used for testing purposes
	  	console.log(response);
		
	}
	
	});
	
	/*------------------------------------*\
	    When the window is resized
	\*------------------------------------*/
	$(window).on('resize', function(){

		// Set Height of Image to Equal Width
		resizeImageHeight();

	});

    
});

/**
 * Format the Stats Section Numbers
 *
 * @param {number} stat
 *
 * @return {number} stat
 */
function statsFormatter(stat){
	
	// If the stat is over 1 billion
	if(stat >= 1000000000){
		return (stat/1000000000).toFixed(1).replace(/\.0$/,'') + 'B';
	}
	
	// If the stat is over 1 million
	if(stat >= 1000000){
		return (stat/1000000).toFixed(1).replace(/\.0$/,'') + 'M';
	}
	
	// If the stat is over 1 thousand
	if(stat >= 1000){
		return (stat/1000).toFixed(1).replace(/\.0$/,'') + 'K';
	}
	
	return stat;
	
}

/**
 * Set Height of Image to Equal Width
 *
 * @return void
 */
function resizeImageHeight(){
	
	// Get the width of the image
	var imageWidth = $('.image-section-image-inner').width();
	
	// Set the height to match the width, so it is square
	$('.image-section-image-inner').height(imageWidth + 'px');
	
}
