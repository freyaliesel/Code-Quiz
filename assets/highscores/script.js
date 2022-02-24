var highScores =  JSON.parse(localStorage.getItem("highScores"));
var listEl = document.querySelector("ol");
var backBtn = document.querySelector("#back-btn");
var clrScoreBtn = document.querySelector("#clear-scores");

console.log(highScores);

// sort the high scores so the greatest score value is at index 0
highScores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
console.log(highScores);

function displayScores() {
    for (var score of highScores) {
        console.log(score);
        var li = document.createElement("li");
        listEl.appendChild(li);
        li.textContent = (`${score.name} - ${score.score}`);
        li.style.textAlign = "left";
        li.style.padding = "5px";
        li.style.marginLeft = "35px";
        li.style.backgroundColor = "aliceblue";

    }
}


displayScores();

backBtn.addEventListener("click", function(){
    console.log(`clicked back button`);
    window.location.href = "./index.html";
});