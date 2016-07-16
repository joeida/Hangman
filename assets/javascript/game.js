// Text - Press any key to get started - unhide, then hide when game has started
var currentWord = "test";
var currentGuessedWord = '';
var numberWins = 0;
var numberLosses = 0;
var startText = "Press any key to get started!";
var successOutput = "Congratulations!  You Guessed Correctly!";
var numberGuessesRemaining = 10;
var numberLettersGuessed = 0;
var listLettersInWord = [];
var listLettersGuessed = [];
var listLettersGuessedCorrect = [];

var hangman = {

    // Parse Word and put letters in List
    convertWordToList: function(currentWord) {
        for (var i = 0; i < currentWord.length; i++) {
            listLettersInWord.push(currentWord[i]);
        }
    },

    // Search for letter in list of correctly guessed letter
    searchLetterInGuessedList: function(letter) {
        var existing = '';
        for (var iii = 0; iii < listLettersGuessed.length; iii++) {
            if (letter === listLettersGuessed[iii]) {
                existing = letter;
            }
        }
        return existing;
    },


    // Search for letter in list of correctly guessed letter
    searchLetterInGuessedCorrectList: function(letter) {
        var existing = '';
        for (var ii = 0; ii < listLettersGuessedCorrect.length; ii++) {
            if (letter === listLettersGuessedCorrect[ii]) {
                existing = letter;
            }
        }
        return existing;
    },


    // Search for letter in Word, get List Index, and add to lettered guessed list
    searchLetterInWord: function(userGuess) {
        var guessedWord = ''
        for (var i = 0; i < listLettersInWord.length; i++) {
            var existingCorrectLetter = this.searchLetterInGuessedCorrectList(listLettersInWord[i]);
            var existingLetter = this.searchLetterInGuessedList(userGuess);
            if (existingCorrectLetter === listLettersInWord[i]) {
                guessedWord += existingCorrectLetter;
            } else if (userGuess === listLettersInWord[i]) {
                guessedWord += userGuess;
                listLettersGuessedCorrect.push(userGuess);
                listLettersGuessed.push(userGuess);
            } else if (userGuess === existingLetter) {
                guessedWord += ' '
                continue;
            } else {
                guessedWord += ' '
                listLettersGuessed.push(userGuess);
            }
        }
        return guessedWord;
    }

};

hangman.convertWordToList(currentWord);
document.onkeyup = function(event) {
    // Make Word Lower Case
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    currentGuessedWord = hangman.searchLetterInWord(userGuess);
    console.log(listLettersInWord);
    console.log(currentGuessedWord);
    console.log(listLettersGuessedCorrect);
    console.log(listLettersGuessed);

    var winH = document.getElementById('winsOutput');
    winH.innerHTML = '';
    var winP = document.createElement('p');
    winP.textContent = currentGuessedWord;
    winH.appendChild(winP);

    if (currentGuessedWord === currentWord) {
        console.log(successOutput);
    }
}
//Output success if guessed correctly
// Increment/decrement Wins
// Increment/decrement Losses

// Photo for Guessed Output
// Optional Sound for Guessed Output

// Reset

/* Optional Work Below */
// Word randomizer
// Automatically pick new word for next game
