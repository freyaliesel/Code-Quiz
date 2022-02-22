// get access to the html objects
var containerEl = document.getElementById("container");
var contentEl = document.getElementById("content");
var startBtn = document.getElementById("startquiz");

console.log(document.body.children)

// create some new html objects
var btns = ["A", "B", "C", "D"]
for (var btn of btns) {
    var btnEl = document.createElement("button");
    containerEl.appendChild(btnEl);
    btnEl.textContent = btn;
    btnEl.style.padding = ".25em, 1em";
    btnEl.style.margin = ".25em 0";
    btnEl.style.display = "none";
}
console.log(document.body.children[1].children);

// testing outside button presses 

const questions = [
    {
        query: "First Question",
        options: ["Correct Answer", "Incorrect Answer", "Wrong Answer", "Bad Answer"],
        answer: "Correct Answer",
    },
];

console.log(questions);



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
    // remove the start button
    startBtn.parentNode.removeChild(startBtn);
    // clear the paragraph contents
    contentEl.textContent = "testing";
    // add buttons for answers

}

// quiz portion function - Do this first
function showQuestions() {
    console.log(`game`);
    var btnEls = document.querySelectorAll("button");
    console.log(btnEls);

    for (i = 0; i < questions.length; i++) {
        contentEl.textContent = questions[i].query;
        for (j = 0; j < btnEls.length; j++) {
            btnEls[j].textContent = questions[i].options[j];
            btnEls[j].style.display = "block";
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
