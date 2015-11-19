console.log('woo');

var answerBlockNumber = 0;
var addBlockToForm = function() {

	var answerBlock = "<div class='blanks-and-hints'><span class='blank-number'>" + num + ". </span><input type='text' name='answer' placeholder='answer here'> <button>hint</button> <span class='hint-show'>- - - -</span></div>";
	$('.block-stack').append(answerBlock);
	// answerBlockNumber = answerBlockNumber + 1;
};

addBlockToForm();

var originalString = "Hello, how are you today my name is Noel, nice to meet you.";
var targetString = 'today nice meet';
var originalTarget = [[4,'today'], [9, 'nice'], [11, 'meet']];


// this will take a block of text, and turn it into an array of strings with punctuation and caps intact
var textStringIntoArray = function(string) {
	var arr = string.split(" ");
	// console.log(arr);
	return arr;
};

var buildNestedArray = function(arr, target) {
	var huntingArray = textStringIntoArray(target); //turns the string of target words into an array of string
	var outerArray = [];
	for (i=0; i<huntingArray.length; i+=1) {
		var temp = arr.indexOf(huntingArray[i]); //saves the index of the target word in the original string as a temp variable
		console.log("temp = ", temp);
		var innerArray = [];
		innerArray.push(temp); //index
		innerArray.push(arr[temp]); //index[value]
		outerArray.push(innerArray); //push inner(tiny)array into outer array
	}
	return outerArray;
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
var makeBlankedText = function(stringContent, stringKeyWords) {

	var arr = textStringIntoArray(stringContent); //turn content into array of strings

	var target = buildNestedArray(arr, stringKeyWords); //turn keyword string into nested array of keywords with 
	// debugger;
	// console.log(arr);
	for (i=0;i<target.length; i+=1) {
		var indexOut = target[i][0]; //grabs index from target array
		console.log("indexOut = ", indexOut);
		var wordOut = target[i][1]; //grabs word from target array
		console.log("wordOut = ", wordOut); 
		var numberIn = '|-----' + num + '-----|';
		// console.log(numberIn);
		var arrBlanked = arr;
		arrBlanked[indexOut] = numberIn; //replaces the word at the target array index with a numbered blank
		arrJoined = arrBlanked.join(' '); //joined the array back into a string
		console.log(arrJoined);

		addBlockToForm();
		num++;
	}
	// j querrry to throw the text onto the page
	$('.text-area').append(arrJoined);
};






