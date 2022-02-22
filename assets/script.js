// get access to the html objects
var containerEl = document.getElementById("container");
var contentEl = document.getElementById("content");
var startBtn = document.getElementById("startquiz");

// create some new html objects
var btns = ["A", "B", "C", "D"];
for (var btn of btns) {
    var btnEl = document.createElement("button");
    containerEl.appendChild(btnEl);
    btnEl.textContent = btn;
    btnEl.style.padding = ".25em, 1em";
    btnEl.style.margin = ".25em 0";
    btnEl.style.display = "none";  
}

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
];


// sets game state, starts timer, and prompts the questions
function startQuiz() {
    console.log(`start the quiz`);

    // prepare the page for the game
    setGameState();

    // call the timer
    // start the game
    showQuestions();
}

function setGameState() {
    console.log(`setting game state`);
    // remove the start button
    startBtn.parentNode.removeChild(startBtn);
    // clear the paragraph contents
    contentEl.textContent = "testing";
    // add buttons for answers
}


function checkAnswer(event) {
    console.log(`checking answer`);
    // console.log(event);
    // console.log(event.srcElement.firstChild.nodeValue);
    var choice = event.srcElement.firstChild.nodeValue;
    console.log(choice);
    
}

// quiz portion function - Do this first
function showQuestions() {
    console.log(`show questions`);
    var btnEls = document.querySelectorAll("button");
   
    // display the question
    for (i = 0; i < questions.length; i++) {
        contentEl.textContent = questions[i].question;
        // put the options on buttons
        for (j = 0; j < btnEls.length; j++) {
            btnEls[j].textContent = questions[i].options[j];
            btnEls[j].style.display = "block";
            btnEls[j].addEventListener("click", function(event) {
                console.log(`Option button was clicked`)
                checkAnswer(event, i);
            });
        }
    }
}

// timer function - integrate after implementing the basic quiz

// score tracking

// event listener for button to start quiz
startBtn.addEventListener("click", function () {
    console.log(`button clicked`);
    startQuiz();
});
