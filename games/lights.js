var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// sound file
var lightsOnSound = new Audio("assets/games/sounds/lightsOn.mp3");
var lightsOffSound = new Audio("assets/games/sounds/lightsOff.mp3");

// define grammar we want to recognize
var grammar = '#JSGF V1.0;'
var message = document.querySelector('#message');
var diagnostic = document.querySelector('.output');
var lights = false;

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

recognition.onresult = function (event) {
  //ar last = event.results.length - 1;
  //var command = event.results[last][0].transcript;
  var last = event.results.length - 1;
  var input = event.results[last][0].transcript;
  diagnostic.textContent = 'Result received: ' + input + '.';

  if (input.toLowerCase() == 'turn on' || input.toLowerCase() == 'on') {
    lightsOnSound.play();
    document.querySelector('#title').innerHTML = "Turn Off the Lights!";
    document.querySelector('#description').innerHTML = "Say turn off to turn off the lights!";
    document.querySelector('#btnGiveCommand').innerHTML = "Say Turn Off!";
    document.getElementById("lights").src = "assets/games/game_images/on.jpg";
  }
  if (input.toLowerCase() == 'turn off' || input.toLowerCase() == 'off') {
    lightsOffSound.play();
    document.querySelector('#title').innerHTML = "Turn On the Lights!";
    document.querySelector('#description').innerHTML = "Say turn on to turn on the lights!";
    document.querySelector('#btnGiveCommand').innerHTML = "Say Turn On!";
    document.getElementById("lights").src = "assets/games/game_images/off.jpg";
  }
}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = 'I didnt recognise that word.';
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#btnGiveCommand').addEventListener('click', function () {
  recognition.start();
});
