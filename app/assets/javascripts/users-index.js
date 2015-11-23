$(document).ready(function(){

	var answerBlockNumber = 0;
	var addBlockToForm = function(wordOut) {

		var answerBlock = "<div class='blanks-and-hints'><span class='blank-number'>" + num + ". </span><input type='text' name='answer' placeholder='Answer Here' data-answer='" + wordOut + "'>";
		// later add the code below to the code above to get the hint button back on the forms, when you have time to make it and it;'s functionality'
		//"<button>hint</button> <span class='hint-show'>- - - -</span></div>";
		$('.block-stack').append(answerBlock);
	};

	var addBlockToFormRandom = function(wordOut) {

		var answerBlock = "<div class='blanks-and-hints'><span class='blank-number'>" + numR + ". </span><input type='text' name='answer' placeholder='Answer Here' data-answer='" + wordOut + "'>";
		// later add the code below to the code above to get the hint button back on the forms, when you have time to make it and it;'s functionality'
		//"<button>hint</button> <span class='hint-show'>- - - -</span></div>";
		$('.block-stack').append(answerBlock);
	};

	// var originalString = "Neda, today at outcomes I want to make sure I listen well and take a lot of notes.";
	// var targetString = 'outcomes lot sure listen Neda notes';
	// var originalTarget = [[4,'today'], [9, 'nice'], [11, 'meet']];


	// this will take a block of text, and turn it into an array of strings with punctuation and caps intact
	var textStringIntoArray = function(string) {
		var arrT = string.match(/[\w-']+|[^\w]+/g);
		// console.log(arrT);
		return arrT;
	};

	// this will take a block of text, and turn it into an array of strings with punctuation and caps intact
	var keywordStringIntoArray = function(string) {
		var arrK = string.split(' ');
		// console.log(arrK);
		return arrK;
	};

	var buildNestedArray = function(arr, target) {
		var huntingArray = keywordStringIntoArray(target); //turns the string of target words into an array of string
		var outerArray = [];
		for (i=0; i<arr.length; i+=1) {
			for (j = 0; j<huntingArray.length; j+=1) {
				if (huntingArray[j] == arr[i]) {
					result = [i, huntingArray[j]];
					outerArray.push(result);
					console.log("result = ", result);
				}
			}
		}
		console.log("outerArray = ", outerArray);
		return outerArray;
	};

	var sortNestedArray = function(arr) {
		// console.log('sortFunction firing');
		arr.sort(function(a, b) {
			return a[0] - b[0];
		});
		return arr;
	};




	// This variable is to use for the makeBlankedText and randBlankedText functions to build the answer blocks.
	var num = 1;



	// this function builds the blanked text on the page using all the other functions
	// var makeBlankedText = function(stringContent, stringKeyWords) {
	var makeBlankedText = function(stringContent, stringKeyWords) {

		var arr = textStringIntoArray(stringContent); //turn content into array of strings

		var arrJoined = "";

		var target = buildNestedArray(arr, stringKeyWords); //turn keyword string into nested array of keywords with 
		// sort the nested array 'target' into the nested sorted array 'targetSorted'
		var targetSorted = sortNestedArray(target);

		for (i=0;i<target.length; i+=1) {
			var indexOut = targetSorted[i][0]; //grabs index from target array
			// console.log("indexOut = ", indexOut);
			var wordOut = targetSorted[i][1]; //grabs word from target array
			// console.log("wordOut = ", wordOut); 
			var numberIn = "<input type='text' name='answer' placeholder='" + num + "' data-answer='" + wordOut + "'>";
			var arrBlanked = arr;
			arrBlanked[indexOut] = numberIn; //replaces the word at the target array index with a numbered blank
			arrJoined = arrBlanked.join(''); //joined the array back into a string
			// console.log(arrJoined);

			// addBlockToForm(wordOut);
			num++;
		}
		// j querrry to throw the text onto the page
		$('.text-area').append(arrJoined);
	};

	var pickANumber = function(arr) {
        // selects and holds onto a random number
		var rando = Math.floor(Math.random() * arr.length);
		return rando;       
  };

  var alreadyInArray = function(num, arr) {
	  for (i=0; i<arr.length; i+=1) {
      if (num == arr[i][0]) {
        return true;
      }
	  }
	};

	// this builds a nested array of the randomly selected words and their index in the array. It also checks to make sure they are longer than a set length and have not already been selected previously.
	var randomNestedBuild = function(num, string) {
		var contentArray = textStringIntoArray(string);
		var selectedWords = [];
		for (i=0; selectedWords.length<num; i+=1) {
		    var selected = pickANumber(contentArray);
		    
		    
		    if (contentArray[selected].length < 3) {
		        console.log("selected is ", selected );
		        console.log("selected word is ", contentArray[selected] );
		        console.log("too short");
		    } else if (alreadyInArray(selected, selectedWords)) {
		        console.log("selected is ", selected);
		        console.log("selected word is ", contentArray[selected]);
		        console.log("this word has already been randomly selected previously.");
		    }else {
		        console.log("selected is ", selected );
		        console.log("selected word is ", contentArray[selected] );
		        console.log("long enough");
		        var innerArray = [];
		        innerArray.push(selected);
		        innerArray.push(contentArray[selected]);
		        selectedWords.push(innerArray);
		    }
		    console.log(selectedWords);
		}
		return selectedWords;
	};

numR = 1;

	// this function creates blanks and forms with randomly selected words instead of targeted keywords.
	var randBlankedText = function(num, stringContent) {
			var arr = textStringIntoArray(stringContent); //turn content into array of strings
			var target = randomNestedBuild(num, stringContent);

			var targetSorted = sortNestedArray(target);

			for (i=0;i<target.length; i+=1) {
				var indexOut = targetSorted[i][0]; //grabs index from target array
				// console.log("indexOut = ", indexOut);
				var wordOut = targetSorted[i][1]; //grabs word from target array
				// console.log("wordOut = ", wordOut); 
				var numberIn = '|-----' + numR + '-----|';
				var arrBlanked = arr;
				arrBlanked[indexOut] = numberIn; //replaces the word at the target array index with a numbered blank
				arrJoined = arrBlanked.join(''); //joined the array back into a string
				// console.log(arrJoined);

				addBlockToFormRandom(wordOut);
				numR++;
			}
			console.log(arrJoined);
			// j querrry to throw the text onto the page
			$('.text-area').append(arrJoined);
		};

	//this line is for hardcoded string content and keywords:
	// makeBlankedText(originalString, targetString); //seeds our page with info and blanks, will need to be called on a SUBMIT event in production

	// this line is for taking in the form's content and keywords:
	makeBlankedText("<%= @quiz.content %>", "<%= @quiz.keyword %>"); //seeds our page with info and blanks, will need to be called on a SUBMIT event in production

	// this line is to trigger the RANDOM Version
	// randBlankedText(3, "<%= @quiz.content %>");


	//keypress function listens for a keyup in the event and checks the field agains the answer it is expecting, which is stored in that input field's data-answer field
	function keypress() {
		$("input[name='answer'").keyup(function(e) { //this looks to the input form and checks it against theKeyword after each key is pressed (and lifted up)
			var theAnswer = $(this).attr('data-answer').toLowerCase(); //this saves the word we want to have them type
			var theKeyword = $(this).val().toLowerCase(); // this reads the word they are typing SO FAR (on each keyup)
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
	
	// $("#quiz-btn").on('click', function() {
	// 	$("#original").hide();
	// 	$("#altered-original").show();
	// });
	$('#quiz-btn').on('click', function(){
		console.log('I was clicked!');
		var data = {quiz_id: $('.quiz').attr('id'),
								user_id: $('.current_user').attr('id')};

		document.getElementById('original').style.display = "none";
		document.getElementById('altered-original').style.display = "block";

		console.log(data);	

		$.ajax({
			type: 'POST',
			url: '/quizzes/' + data.quiz_id + '/enrichments',
			datatype: 'JSON',
			data: data
		}).done(function(response){
			console.log(response.enrichment);
		});

	});


});