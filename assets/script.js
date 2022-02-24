// get access to the html objects
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
var btnEls = document.querySelectorAll("button");

// quiz variables
var index = 0;
var gameOver = false;
var timeLeft;
var timerInterval;

// testing outside button presses

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
}

// timer function - integrate after implementing the basic quiz
function setTimer() {
    console.log(`Timer started`);
    timeLeft = 5 * questions.length;
    console.log(`time left is ${timeLeft}`);
    timerEl.textContent = timeLeft;
    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        // when timer ends, game is over
        if (timeLeft <= 10) {
            timerEl.style.color = "yellow";
        }
        if (timeLeft <= 5) {
            timerEl.style.color = "red";
        }
        if (timeLeft === 0) {
            timerEl.textContent = timeLeft;
            clearInterval(timerInterval);
            console.log(`time is up`);
            calculateScore();
        }
        if (timeLeft < 0) {
            timeLeft = 0;
            timerEl.textContent = timeLeft;
            clearInterval(timerInterval);
        }
    }, 1000);
}

// check to see if user was correct, advance to next question
function checkAnswer(event) {
    console.log(`checking answer`);
    if (event.target.nodeName.toLowerCase() === "button") {
        var choice = event.target.textContent;
        console.log(choice, index);

        if (choice == questions[index].answer) {
            index++;
            console.log(`correct!`);
            showQuestion();
        } else {
            index++;
            timeLeft += -5;
            timerInterval = timeLeft;
            console.log(`wrong!`);
            showQuestion();
        }
    }
}

// quiz portion function - Do this first
function showQuestion() {
    console.log(`show question`);
    console.log(index);

    // display the question
    if (index < questions.length) {
        contentEl.textContent = questions[index].question;
        // put the options on buttons
        for (i = 0; i < btnEls.length; i++) {
            btnEls[i].textContent = questions[index].options[i];
            btnEls[i].style.display = "block";
        }
    } else {
        console.log(`This is coming from showQuestion`);
        calculateScore();
    }
}

// determine how the user did
function calculateScore() {
    console.log(`calculating score`);
    clearInterval(timerInterval);
    timerBoxEl.style.display = "none";
    optionsEl.style.display = "none";
    contentEl.insertAdjacentHTML('beforebegin', '<h2>Quiz Complete</h2>');
    contentEl.textContent = `Your Score: ${timeLeft}`;
   
    document.querySelector("form").style.display = "block";
    document.getElementById("score-submit-btn").addEventListener("submit", submitScore);

}

function submitScore() {
    console.log(`submitting score`);
}



// delegated event listener for quiz buttons
optionsEl.addEventListener("click", function (event) {
    console.log(`Container was clicked`);
    checkAnswer(event, index);
});

// event listener for button to start quiz
startBtn.addEventListener("click", startQuiz);
