$(document).ready(function(){
	// this click event on #quiz-btn hides the original text and displays the blanked out text when 'take quiz' button is clicked
	$('#quiz-btn').on('click', function(e) {
		e.preventDefault();
		// hides the top div and shows the bottom div
		document.getElementById('original').style.display = "none";
		document.getElementById('altered-original').style.display = "block";
		// this will also need to associate the current user user_id with the current quiz_id to the Enrichment join table, complete status will be default incomplete
	});

	// this click event on im done button will check that all the fields are correct, then handle eventualities
	$('#im-done').on('click', function(e) {
		e.preventDefault();
		// each quiz-blank class input field that does NOT have class green-glow get class red-glow
		$('.quiz-blank').each( function(i) {
		    if ( !$(this).hasClass('green-glow') ) {
	        $(this).addClass('red-glow');
		    } 
		});
		// if the input fields are all gree, it console logs correct, then changes the boolean, and redirects to user profile page
		if (!$(".quiz-blank").not(".green-glow").length) {
			console.log("OMG ALL CORRECT");
			// TODO change boolean of completed on Enrichment join table from false to true
		  // TODO redirect to the user profile page
		}
	});

});
