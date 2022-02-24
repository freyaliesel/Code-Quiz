var highScores = JSON.parse(localStorage.getItem("highScores"));
var listEl = document.querySelector("ol");
var backBtn = document.querySelector("#back-btn");
var clrScoreBtn = document.querySelector("#clear-scores");

console.log(highScores);

if (highScores !== null){
// sort the high scores so the greatest score value is at index 0
highScores.sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
console.log(highScores);

displayScores();
}

function displayScores() {
    for (var score of highScores) {
        console.log(score);
        var li = document.createElement("li");
        listEl.appendChild(li);
        li.textContent = `${score.name} - ${score.score}`;
        li.style.textAlign = "left";
        li.style.padding = "5px";
        li.style.marginLeft = "35px";
    }
}



backBtn.addEventListener("click", function () {
    console.log(`back to quiz`);
    window.location.href = "./index.html";
});

clrScoreBtn.addEventListener("click", function () {
    console.log(`clearing high scores`);
    localStorage.clear();

    var list = document.querySelectorAll("li");
    for (i = 0; i < list.length; i++){
        list[i].parentNode.removeChild(list[i]);
    }
});
