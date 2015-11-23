$(document).ready(function(){
	$('#quiz-btn').on('click', function(e) {
		// console.log('Keyword click happeninng');
		e.preventDefault();
		// hides the top div and shows the bottom div
		document.getElementById('original').style.display = "none";
		document.getElementById('altered-original').style.display = "block";
	});
});
