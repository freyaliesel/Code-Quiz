// get access to the html objects
var container = document.getElementById("container");
var content = document.getElementById("content");
var startBtn = document.getElementById("startquiz");

// create some new html objects
var h2El = document.createElement("h2");


//testing outside button presses 

const questions = [
    {
        question: "First Question",
        optionOne: "Correct Answer",
        optionTwo: "Incorrect Answer One",
        optionThree: "Incorrect Answer Two",
        optionFour: "Incorrect Answer Three",
        correctAnswer: "optionOne",
    },
];

console.log(questions);



// function for the game that the button calls - starts timer and prompts the questions
function startQuiz() {
    console.log(`start the quiz`);

    // prepare the page for the game
    setGameState();

    // call the timer
    // start the game
    showQuestions();
}

function setGameState() {
    startBtn.parentNode.removeChild(startBtn);
    content.textContent = "";
}

// quiz portion function - Do this first
function showQuestions() {
    console.log(`game`);

   
}

// timer function - integrate after implementing the basic quiz

// score tracking

// event listener for button to start quiz
startBtn.addEventListener("click", function () {
    console.log(`button clicked`);
    startQuiz();
});
