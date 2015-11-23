$(document).ready(function(){
	// this click event on #quiz-btn hides the original text and displays the blanked out text when 'take quiz' button is clicked
	$('#quiz-btn').on('click', function(e) {
		e.preventDefault();
		// hides the top div and shows the bottom div
		document.getElementById('original').style.display = "none";
		document.getElementById('altered-original').style.display = "block";
		// this will also need to associate the current user user_id with the current quiz_id to the Enrichment join table, complete status will be default incomplete		
		var data = {quiz_id: $('.quiz').attr('id'),
								user_id: $('.current_user').attr('id')};

		$.ajax({
			type: 'POST',
			url: '/quizzes/' + data.quiz_id + '/enrichments',
			datatype: 'JSON',
			data: data
		}).done(function(response){
			console.log(response.enrichment);
		});
	}); //this closes the #quiz-btn click event

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
	}); //this closes the #im-done click event

}); // this closes the document ready function

// below are the vars and functions that work to run the quiz builder engine and for both random and keyword variations
	var randomWordMinSize = 3;

	// buildNestedArray takes in an array of text and a target string of keywords and builds a nested array of [index, 'word'] arrays that are used in the larger functions.	
	var buildNestedArray = function(stringContent, stringKeyWords) {

		var huntingArray = stringKeyWords.split(/[ ,]+/).filter(Boolean);
		// strip punctuation from the end of each word if there, to get rid of commas that people may have put in array orders

		// this regex splits the content into an array where the whitespace and all punctuation is saved in it's own index for the purpose of rebuilding later.
		var contentArray = stringContent.match(/[\w-']+|[^\w]+/g);
		var outerArray = [];
		for (i=0; i<contentArray.length; i+=1) {
			// double loop works through array of content with array of target words to find indexes and build nested array
			for (j = 0; j<huntingArray.length; j+=1) {
				if (huntingArray[j] == contentArray[i]) {
					result = [i, huntingArray[j]];
					outerArray.push(result);
				}
			}
		}
		return outerArray;
	};

	// this builds a nested array of the randomly selected words and their index in the array. It also checks to make sure they are longer than a set length and have not already been selected previously.
	var randomNestedBuild = function(num, string) {
		var contentArray = string.match(/[\w-']+|[^\w]+/g);
		var selectedWords = [];
		for (i=0; selectedWords.length<num; i+=1) {
		    var selected = pickANumber(contentArray);
		    
		    if (contentArray[selected].length < randomWordMinSize) {
		        // console.log("selected is ", selected );
		        // console.log("selected word is ", contentArray[selected] );
		        console.log("too short");
		    } else if (alreadyInArray(selected, selectedWords)) {
		        // console.log("selected is ", selected);
		        // console.log("selected word is ", contentArray[selected]);
		        console.log("this word has already been randomly selected previously.");
		    } else {
		        // console.log("selected is ", selected );
		        // console.log("selected word is ", contentArray[selected] );
		        console.log("long enough");
		        var innerArray = [];
		        innerArray.push(selected);
		        innerArray.push(contentArray[selected]);
		        selectedWords.push(innerArray);
		    }
		}
		return selectedWords;
	};

	// sortNestedArray takes a nested array of [index,'word'] pairs and then orders them within the larger array from lowest index to largest
	var sortNestedArray = function(arr) {
		arr.sort(function(a, b) {
			return a[0] - b[0];
		});
		return arr;
	};

	// pickANumber chooses a random number that will correspond to one of the indexes in the array
	var pickANumber = function(arr) {
    // selects and holds onto a random number
		var rando = Math.floor(Math.random() * arr.length);
		return rando;       
  };

  // alreadyInArray checks to see if the randomly selected word is already in the array of random words or not.
  var alreadyInArray = function(num, arr) {
	  for (i=0; i<arr.length; i+=1) {
      if (num == arr[i][0]) {
        return true;
      }
	  }
	};

	// fromNestedArrToDOM takes in the string of content and the nested array and then builds the blanked form and appends it to the DOM
	var fromNestedArrToDOM = function(stringContent, nestedArr) {
		var arr = stringContent.match(/[\w-']+|[^\w]+/g);
		var nestedArrSorted = sortNestedArray(nestedArr);
		var num = 1;
		for (i=0;i<nestedArr.length; i+=1) {
			var indexOut = nestedArrSorted[i][0]; //grabs index from target array
			var wordOut = nestedArrSorted[i][1]; //grabs word from target array
			var numberIn = "<input type='text' name='answer' class='quiz-blank' placeholder='" + num + "' data-answer='" + wordOut + "'>";
			var arrBlanked = arr;
			arrBlanked[indexOut] = numberIn; //replaces the word at the target array index with a numbered blank
			arrJoined = arrBlanked.join(''); //joined the array back into a string
			num++;
		}
		// j querrry to throw the blanked text onto the page
		$('.text-area').append(arrJoined);	
	};

	// makeBlankedText builds the blanked text on the page using all the other functions
	var makeBlankedText = function(stringContent, stringKeyWords) {
		var nestedArr = buildNestedArray(stringContent, stringKeyWords); //turn keyword string into nested array of keywords with 
		fromNestedArrToDOM(stringContent, nestedArr);
	};

	// randBlankedText creates blanks and forms with randomly selected words instead of targeted keywords.
	var randBlankedText = function(num, stringContent) {
			var nestedArr = randomNestedBuild(num, stringContent);
			fromNestedArrToDOM(stringContent, nestedArr);
	};

	// checkIfTooMany takes in the content string and the keyword field IF IT IS A NUMBER and then makes sure that number is not larger than the number of words in the content string. used for RANDOM word blanking only.
	var checkIfTooMany = function(num, stringContent) {
		var contentArray = stringContent.split(' ');
		// loop through array to filter for number of words that will qualify (currently 3 letters of larger, and not with apostrophe)
		var validNumber = contentArray.length;
		for (i=0; i<contentArray.length; i+=1) {
			if (contentArray[i].length<randomWordMinSize) {
				// subtracts because word is too short
				validNumber -= 1;
			} else if (contentArray[i].indexOf('\'') >= 0) {
				// subtracts because word has an apostrophe
				validNumber -= 1;
			}
		}
		var maxNum = validNumber;
		if (num<=maxNum) {
			// the number is less than or equal to the number of selectable words in the content, so use this number
			return num;
		} else {
			// the number is not more than the number of qualified words in the content, so use that maxNum.
			return maxNum;
		}
	};

	// keywordsOrRandom takes in the content and keyword/random field and then determines if it is keywords or random, and acts accordingly
	var keywordsOrRandom = function(contentField, keywordField) {
		if (isNaN(keywordField)) {
			// console.log("keywordField is a string.");
			makeBlankedText(contentField, keywordField);
		} else if (!isNaN(keywordField)) {
			// console.log("keywordField is a number.");
			var num = Number(keywordField);
			var filteredNum = checkIfTooMany(num, contentField);
			// run the quiz params through the random function with the filtered number.
			randBlankedText(filteredNum, contentField);
		} else {
			console.log("keywordField is neither a string nor a number. What have you done? keywordField = ", keywordField);
		}
	};

	//keypress function listens for a keyup in the event and checks the field agains the answer it is expecting, which is stored in that input field's data-answer field
	function keypress() {
		$("input[name='answer'").keyup(function(e) { //this looks to the input form and checks it against theKeyword after each key is pressed (and lifted up)
			var theAnswer = $(this).attr('data-answer').toLowerCase(); //this saves the word we want to have them type
			var theKeyword = $(this).val().toLowerCase(); // this reads the word they are typing SO FAR (on each keyup)
		if (theAnswer == theKeyword) {
			//add class to the input field that CORRECT ANSWER will turn the glow green via css red class for incorrect answer will be removed if present
			$(this).removeClass('red-glow');
			$(this).addClass('green-glow');
		} else {
			// make sure green-glow is gone unless the correct answer is entered. red class for incorrect answer will be removed if present
			$(this).removeClass('green-glow');
			$(this).removeClass('red-glow');
		}
		});
	}
