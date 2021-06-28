// end of quiz, display form for score keeping
function showScore(s) {


    showElement(scoreFormEl);
    hideElement(questionsContainerEl);
    hideElement(headerEl);
    scoreEl.textContent = s + ".";
}

// score is added to score list
function saveScore(s) {

    showElement(scoreContainerEl);
    hideElement(scoreFormEl);

    var scoreLineEl = document.createElement('li');
    scoreLineEl.innerText = initialsEl.value + " - " + s;
    scoreListEl.appendChild(scoreLineEl);
    initialsEl.value = "";
}

displayHighscores();