var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// define grammar we want to recognize
var grammar = '#JSGF V1.0;'
var message = document.querySelector('#message');
var diagnostic = document.querySelector('.output');

// create a speech recognition instance
var recognition = new SpeechRecognition();

// create a new speech grammar list
var speechRecognitionList = new SpeechGrammarList();

// add grammar to list 
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.addEventListener('soundstart', function() { 
  //document.querySelector('#flip').remove();
  //document.querySelector('#btnGiveCommand').remove();
  document.getElementById("pancake").src="assets/games/game_images/flip.gif";
});


recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = 'I didnt recognise that word.';
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#btnGiveCommand').addEventListener('click', function() {
  recognition.start();
});
