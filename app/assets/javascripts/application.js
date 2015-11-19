// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var body = "This is a sentence shorp. We will take words from it.";

var keywords = ["sentence","words"];

function keyCompare (paragraph, key) {
    var answerKey = [];
    for (var i=0; i < key.length; i++){
        for (var j=0; j <= paragraph.length; j++){
            if (paragraph[j] == key[i]){
                answerKey.push([paragraph.indexOf(key[i]), paragraph[j]]);
            }
        }
    }
    return answerKey;
}

var answerKey = keyCompare(body.split(' '), keywords);

function numberReplace(original, answerKey){
    for (var j = 0; j < answerKey.length; j++){
        original[answerKey[j][0]] = j + 1;
        }
    return original.join(' ');
    }
    
numberReplace(body.split(' '), answerKey);


var body = "This is a sentence shorp. We will take words from it.";

var keywords = ["sentence","words", "shorp"];

// Compares body array 
var wordRemoval = function(string, array){
    for (var i = 0; i < array.length; i++){
    	//Replace keyword with text input field.
        string = string.replace(array[i], "input field"); 
    }
    return string;
};

wordRemoval(body,keywords);




