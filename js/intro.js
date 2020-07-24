
// List of sentences
var _CONTENT = [ "Welcome  to  Mars  Colonization  Program",
	"This  Website has been developed for Microsoft Engage 2020",
"This Journey to Mars is going to be very tiring",
"You may need to refresh your mind",
"What about playing Tic Tac Toe?",
"Let's start the Game"];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#content");

// Implements typing effect
function Type() {
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	}
}

// Implements deleting effect
function Delete() {
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If last sentence then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1)){
			setTimeout(Redirect() , 2000);
		}
		else
			_PART++;
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Type, 50);
		}, 50);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

function Redirect() {
               setTimeout(_PART=0 , 3000);
               $("html, body").animate({
                    scrollTop: $(
                      'html, body').get(0).scrollHeight
                }, 2000);
              // window.location = "index.html#two";
            }
