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
        question:
            "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        options: [
            "The User's machine running a Web browser",
            "The Web server",
            "A central machine deep within Google's corporate offices",
            "The cloud",
        ],
        answer: "The User's machine running a Web browser",
    },
    {
        question: "JavaScript is a(n) _______ language?",
        options: ["Object-Based", "Procedural", "Object-Oriented", "Compiled"],
        answer: "Object-Oriented",
    },
    {
        question:
            "When an operator’s value is NULL, the typeof returned by the unary operator is:",
        options: ["Boolean", "Undefined", "Object", "Integer"],
        answer: "Object",
    },
    {
        question:
            "Which function is used to serialize an object into a JSON string in JavaScript?",
        options: ["stringify()", "parse()", "convert()", "toString()"],
        answer: "stringify()",
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["Node", "Vue", "React", "Cassandra"],
        answer: "Cassandra",
    },
    {
        question: "Which stops an interval timer in JavaScript?",
        options: [
            "clearInterval()",
            "clearTimer()",
            "intervalOver()",
            "setTimeout()",
        ],
        answer: "clearInterval()",
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["/* Comment */", "// Comment", "# Comment", "$ Comment $"],
        answer: "// Comment",
    },
    {
        question:
            "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        options: ["last()", "put()", "push()", "shift()"],
        answer: "push()",
    },
    {
        question:
            "Which of the following functions returns a string value version of the current number?",
        options: ["toString()", "toFixed()", "toLocaleString()", "stringify()"],
        answer: "toString()",
    },
    {
        question:
            "Which function returns the characters in a string, beginning at the specified location through the specified number of characters?",
        options: ["slice()", "split()", "substr()", "search()"],
        answer: "substr()",
    },
    {
        question:
            "Which function adds one or more elements to the end of an array and returns the new length of the array?",
        options: ["pop()", "push()", "join()", "map()"],
        answer: "push()",
    },
    {
        question: "Which symbol is used to separate JavaScript statements?",
        options: ["Comma ','", "Colon ';'", "Hyphen '-'", "Semicolon ';'"],
        answer: "Semicolon ';'",
    },
    {
        question: "What is the default value of an uninitialized variable?",
        options: ["0", "undefined", "null", "NaN"],
        answer: "undefined",
    },
    {
        question: "In JavaScript, arrays are written with:",
        options: [
            "round brackets ()",
            "curly brackets {}",
            'double quotes ""',
            "square brackets []",
        ],
        answer: "square brackets []",
    },
    {
        question: "JavaScript objects are written with:",
        options: [
            "round brackets ()",
            "curly brackets {}",
            'double quotes ""',
            "square brackets []",
        ],
        answer: "curly brackets {}",
    },
    {
        question: "Which property is used to get the length of a string in JavaScript?",
        options: [
            ".strlen", 
            ".len", 
            ".length", 
            ".stringLength",
        ],
        answer: "length",
    },
    {
        question: "Which character is used to break up a code line within a text string?",
        options: [
            "Single quote '", 
            "Single backslash \\", 
            'Double quote "', 
            "Back-tick `",
        ],
        answer: "Single backslash \\",
    },
    {
        question: 'In JavaScript, the string template literals use _____ rather than quotes ("") to define a string',
        options: [
            "Single quotes ''", 
            "Backslash with single quote \\'\\'", 
            "Backslashes \\\\", 
            "Back-ticks ``",
        ],
        answer: "Back-ticks ``",
    },
    {
        question: "Which JavaScript method is used to create a new array with array elements that pass a test?",
        options: [
            "forEach()", 
            "map()", 
            "forMap()", 
            "filter()",
        ],
        answer: "filter()",
    },
    {
        question: "Which is not a JavaScript data type?",
        options: [
            "Undefined", 
            "Number", 
            "Boolean", 
            "Float",
        ],
        answer: "Float",
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
    timeLeft = 15 * quizQuestions.length;
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
        console.log(quizQuestions[index].options);
        // shuffle the options order
        quizQuestions[index].options = quizQuestions[index].options.sort(
            () => Math.random() - 0.5
        );
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
        //shuffle answers
        quizQuestions[index].options.sort(() => Math.random() - 0.5);
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