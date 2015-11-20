console.log('woo');

$(document).ready(function(){

var answerBlockNumber = 0;
var addBlockToForm = function(wordOut) {

	var answerBlock = "<div class='blanks-and-hints'><span class='blank-number'>" + num + ". </span><input type='text' name='answer' placeholder='Answer Here' data-answer='" + wordOut + "'>";
	// later add the code below to the code above to get the hint button back on the forms, when you have time to make it and it;'s functionality'
	//"<button>hint</button> <span class='hint-show'>- - - -</span></div>";
	$('.block-stack').append(answerBlock);
};

var originalString = "Hello, how are you today my name is Noel, nice to meet you.";
var targetString = 'today nice name meet';
// var originalTarget = [[4,'today'], [9, 'nice'], [11, 'meet']];


// this will take a block of text, and turn it into an array of strings with punctuation and caps intact
var textStringIntoArray = function(string) {
	var arr = string.split(" ");
	return arr;
};

var buildNestedArray = function(arr, target) {
	var huntingArray = textStringIntoArray(target); //turns the string of target words into an array of string
	var outerArray = [];
	for (i=0; i<huntingArray.length; i+=1) {
		var temp = arr.indexOf(huntingArray[i]); //saves the index of the target word in the original string as a temp variable
		// console.log("temp = ", temp);
		var innerArray = [];
		innerArray.push(temp); //index
		innerArray.push(arr[temp]); //index[value]
		outerArray.push(innerArray); //push inner(tiny)array into outer array
	}
	return outerArray;
};

var sortNestedArray = function(arr) {
	// console.log('sortFunction firing');
	arr.sort(function(a, b) {
		return a[0] - b[0];
	});
	return arr;
};

var selectRandom = function(num, arr) {
	for (i=0; i<num; i+=1) {
		// selects and holds onto a random number
		var rando = Math.floor(Math.random() * arr.length);
		console.log(rando); //this is the index of the removed item
		console.log(arr[rando]); //this is the value of the removed item
	}
};


var num = 1;



// this function builds the blanked text on the page using all the other functions
// var makeBlankedText = function(stringContent, stringKeyWords) {
var makeBlankedText = function(stringContent, stringKeyWords) {

	var arr = textStringIntoArray(stringContent); //turn content into array of strings

	var target = buildNestedArray(arr, stringKeyWords); //turn keyword string into nested array of keywords with 
	// sort the nested array 'target' into the nested sorted array 'targetSorted'
	var targetSorted = sortNestedArray(target);

	for (i=0;i<target.length; i+=1) {
		var indexOut = targetSorted[i][0]; //grabs index from target array
		// console.log("indexOut = ", indexOut);
		var wordOut = targetSorted[i][1]; //grabs word from target array
		// console.log("wordOut = ", wordOut); 
		var numberIn = '|-----' + num + '-----|';
		var arrBlanked = arr;
		arrBlanked[indexOut] = numberIn; //replaces the word at the target array index with a numbered blank
		arrJoined = arrBlanked.join(' '); //joined the array back into a string
		// console.log(arrJoined);

		addBlockToForm(wordOut);
		num++;
	}
	// j querrry to throw the text onto the page
	$('.text-area').append(arrJoined);
};

makeBlankedText(originalString, targetString); //seeds our page with info and blanks, will need to be called on a SUBMIT event in production


//keypress function listens for a keyup in the event and checks the field agains the answer it is expecting, which is stored in that input field's data-answer field
function keypress() {
	$("input[name='answer'").keyup(function(e) { //this looks to the input form and checks it against theKeyword after each key is pressed (and lifted up)
		var theAnswer = $(this).attr('data-answer'); //this saves the word we want to have them type
		var theKeyword = $(this).val(); // this reads the word they are typing SO FAR (on each keyup)
		// console.log("theAnswer = ", theAnswer);
		// console.log("theKeyword = ", theKeyword);

	if (theAnswer == theKeyword) {
		//add class to the input field that will turn the glow green via css
		$(this).addClass('green-glow');
		//if answer is correct
		// console.log("you are CORRECT");
	} else {
		// make sure green-glow is gone unless the correct answer is entered
		$(this).removeClass('green-glow');
		

		//if answer is incorrect
		// console.log("you are INCORRECT");
	}
	});
}

keypress(); // this starts the event listener on the input fields that check the answer against the expected answer with each keypress


});