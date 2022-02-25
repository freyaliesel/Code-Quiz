// get access to the existing html objects
var optionsEl = document.getElementById("options");
var contentEl = document.getElementById("content");
var startBtn = document.getElementById("startquiz");
var timerBoxEl = document.getElementById("timer-box");
var timerEl = document.getElementById("timer");

// create some new html objects
var btns = ["A", "B", "C", "D"];
for (var btn of btns) {
    var btnEl = document.createElement("button");
    optionsEl.appendChild(btnEl);
    btnEl.textContent = btn;
    btnEl.className = "choiceBtn";
    btnEl.style.padding = ".25em, 1em";
    btnEl.style.margin = ".25em .25em";
    btnEl.style.display = "none";
}
var btnEls = document.querySelectorAll(".choiceBtn");

// quiz variables
var index = 0;
var gameOver = false;
var timeLeft;
var timerInterval;
var quizQuestions = [];

const questions = [
    {
        question: "First Question",
        options: [
            "Correct Answer",
            "Incorrect Answer",
            "Wrong Answer",
            "Bad Answer",
        ],
        answer: "Correct Answer",
    },
    {
        question: "Second Question",
        options: [
            "Wrong Answer",
            "Incorrect Answer",
            "Right Answer",
            "Bad Answer",
        ],
        answer: "Right Answer",
    },
    {
        question: "Third Question",
        options: [
            "Wrong Answer",
            "Genuine Answer",
            "Incorrect Answer",
            "Bad Answer",
        ],
        answer: "Genuine Answer",
    },
    {
        question: "Fourth Question",
        options: [
            "Bad Answer",
            "Wrong Answer",
            "Good Answer",
            "Incorrect Answer",
        ],
        answer: "Good Answer",
    },
    {
        question: "Fifth Question",
        options: [
            "Wrong Answer",
            "Bad Answer",
            "Incorrect Answer",
            "Accurate Answer",
        ],
        answer: "Accurate Answer",
    },
    {
        question: "Sixth Question",
        options: [
            "Correct Answer",
            "Incorrect Answer",
            "Wrong Answer",
            "Bad Answer",
        ],
        answer: "Correct Answer",
    },
    {
        question: "Seventh Question",
        options: [
            "Wrong Answer",
            "Incorrect Answer",
            "Right Answer",
            "Bad Answer",
        ],
        answer: "Right Answer",
    },
    {
        question: "Eighth Question",
        options: [
            "Wrong Answer",
            "Genuine Answer",
            "Incorrect Answer",
            "Bad Answer",
        ],
        answer: "Genuine Answer",
    },
    {
        question: "Ninth Question",
        options: [
            "Bad Answer",
            "Wrong Answer",
            "Good Answer",
            "Incorrect Answer",
        ],
        answer: "Good Answer",
    },
    {
        question: "Tenth Question",
        options: [
            "Wrong Answer",
            "Bad Answer",
            "Incorrect Answer",
            "Accurate Answer",
        ],
        answer: "Accurate Answer",
    },
];

// sets game state, starts timer, and prompts the questions
function startQuiz() {
    console.log(`start the quiz`);
    // prepare the page for the game
    setGameState();
    // call the timer
    setTimer();
    // start the game
    showQuestion();
}

// prepare for the game to start
function setGameState() {
    console.log(`setting game state`);
    // remove the start button
    startBtn.parentNode.removeChild(startBtn);
    // add buttons for answers
    timerBoxEl.style.display = "flex";
    // randomize question selection
    selectQuestions();
}

// timer function - integrate after implementing the basic quiz
function setTimer() {
    console.log(`Timer started`);
    timeLeft = 5 * questions.length;
    console.log(`time left is ${timeLeft}`);
    displayTimeLeft();
    timerInterval = setInterval(function () {
        timeLeft--;
        displayTimeLeft();
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            console.log(`time is up`);
            console.log(`this is coming from setTimer`);
            calculateScore();
        }
    }, 1000);
}

// update the timer based on how much time is left
function displayTimeLeft() {
    // update timer color based on how much time is left
    timerEl.textContent = timeLeft;
    if (timeLeft <= 5) {
        timerEl.style.color = "red";
    } else if (timeLeft <= 10) {
        timerEl.style.color = "yellow";
    }
}

// randomizes the questions selected for the quiz
function selectQuestions() {
    console.log(`selecting questions`);
    var tmp = [];
    while (quizQuestions.length < 5) {
        tmp.push(
            questions.splice(
                Math.floor(Math.random() * questions.length - 1),
                1
            )[0]
        );
        quizQuestions.push(tmp.pop());
    }
    console.log(quizQuestions);
}

// Displays the quiz
function showQuestion() {
    console.log(`show question`);
    console.log(`on question index ${index}`);
    // display the question
    if (index < quizQuestions.length) {
        contentEl.textContent = quizQuestions[index].question;
        console.log(quizQuestions[index].options)
        // shuffle the options order
        quizQuestions[index].options = quizQuestions[index].options.sort(() => Math.random() - 0.5)
        // put the options on buttons
        for (i = 0; i < btnEls.length; i++) {
            btnEls[i].textContent = quizQuestions[index].options[i];
            if (btnEls[i].style.display != "block")
                btnEls[i].style.display = "block";
        }
    } else {
        console.log(`This is coming from showQuestion`);
        calculateScore();
    }
}

// check to see if user was correct, advance to next question
function checkAnswer(event) {
    console.log(`checking answer`);
    if (event.target.nodeName.toLowerCase() === "button") {
        var choice = event.target.textContent;
        console.log(choice, index);

        if (choice == quizQuestions[index].answer) {
            index++;
            console.log(`correct!`);
            showQuestion();
        } else {
            index++;
            timeLeft += -5;
            if (timeLeft < 0) timeLeft = 0;
            displayTimeLeft();
            console.log(`wrong!`);
            console.log(`this is coming from checkAnswer`);
            showQuestion();
        }
    }
}

// determine how the user did
function calculateScore() {
    console.log(`calculating score`);
    clearInterval(timerInterval);
    // score cannot be less than 0
    if (timeLeft < 0) timeLeft = 0;
    // hide elements not in use
    timerBoxEl.style.display = "none";
    optionsEl.style.display = "none";
    // add an H2
    contentEl.insertAdjacentHTML("beforebegin", "<h2>Quiz Complete</h2>");
    // show the score
    contentEl.textContent = `Your Score: ${timeLeft}`;
    // show the form to submit score
    document.querySelector("form").style.display = "block";
    // add event listener to the submit score button
    document
        .getElementById("score-submit-btn")
        .addEventListener("click", submitScore);
}

function submitScore(event) {
    event.preventDefault();
    console.log(`submitting score`);
    // get the contents of the form
    var initialsEl = document.getElementById("initials");
    // check user submitted valid initials before creating score
    var highScores = [];
    if (initialsEl.value.length <= 4 && initialsEl.value.length > 1) {
        // put the current score into an object
        var result = {
            name: initialsEl.value,
            score: timeLeft,
        };
        highScores.push(result);
        console.log(highScores);
        // check if there are already scores saved
        var savedScores = JSON.parse(localStorage.getItem("highScores"));
        if (savedScores !== null) {
            console.log(savedScores);
            highScores = highScores.concat(savedScores);
            console.log(highScores);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            displayHighScores();
        } else {
            localStorage.setItem("highScores", JSON.stringify(highScores));
            displayHighScores();
        }
    } else {
        console.log(`please enter initials`);
    }
}

function displayHighScores() {
    console.log(`displaying high scores`);
    window.location.href = "./highscores.html";
}

// delegated event listener for quiz buttons
optionsEl.addEventListener("click", function (event) {
    console.log(`Container was clicked`);
    checkAnswer(event);
});

// event listener for button to start quiz
startBtn.addEventListener("click", startQuiz);
