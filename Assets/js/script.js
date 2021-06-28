const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var timerEl = document.getElementById('countdown')
var scoreForm = document.querySelector("#formScore")
let shuffledQuestions, currentQuestionIndex



var timeLeft = 30;
let score = 0;
var isFirstGuess = true;

startButton.onclick = countdown;
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    var hidenLand = document.getElementById('h1star')
    hidenLand.remove('hide')
    var hidenLand2 = document.getElementById('pstar')
    hidenLand2.remove('hide')  
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function countdown() {

    timeInterval = setInterval(function () {

        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;

        // won't let the timer go under 0 and stops quiz
        if (timeLeft === 0) {
            ShowScore()
            clearArea();
            clearInterval(timeInterval)
        }
    }, 1000);

}

function setNextQuestion() {
    isFirstGuess = true;

    if (currentQuestionIndex <= shuffledQuestions.length - 2) {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } else {
        // right here you need to store the variable 

        // score in localStorage.
        window.location.href='Final-scores.html'
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (correct && isFirstGuess) {
        score++;

    }
    console.log(score)

    isFirstGuess = false;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
       var infoUser = document.getElementById('infoUser')
       infoUser.classList.show()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
       
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'The condition in an if/else statement is enclosed with_____.',
        answers: [
            { text: 'square brackets', correct: false },
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parenthesis', correct: true }
            
        ]
    },
    {
        question: 'Commonly used data types Do Not include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'all of the above', correct: true },
            { text: 'booleans', correct: false },
            { text: 'other arrays', correct: false }
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for pringting content to the debugger is:',
        answers: [
            { text: 'JavScript', correct: false },
            { text: 'console.log', correct: true },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: false }
        ]
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: [
            { text: 'commas', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'quotes', correct: true},
            { text: 'parenthesis', correct: false }
        ]
    }
]