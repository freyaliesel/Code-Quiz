var highScores = JSON.parse(localStorage.getItem("highScores"));
var listEl = document.querySelector("ol");
var backBtn = document.querySelector("#back-btn");
var clrScoreBtn = document.querySelector("#clear-scores");

if (highScores !== null) {
    // sort the high scores so the greatest score value is at index 0
    highScores.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
    );
    console.log(highScores);

    displayScores();
} else {
    clrScoreBtn.style.display = "none";
    document
        .querySelector("h1")
        .insertAdjacentHTML(
            "afterend",
            '<p style= "text-align: center;">Take the quiz to see your score!</p>'
        );
        listEl.style.display = "none";
}

function displayScores() {
    for (var score of highScores) {
        console.log(score);
        var index = listEl.children.length;
        var li = document.createElement("li");
        listEl.appendChild(li);
        li.textContent = `${score.name} - ${score.score}`;
        li.style.textAlign = "left";
        li.style.padding = "5px";
        li.style.marginLeft = "35px";
        index % 2 == 0 ? li.style.backgroundColor = '#EBDEF0' : li.style.backgroundColor = '#F5EEF8';
    }
}

backBtn.addEventListener("click", function () {
    console.log(`back to quiz`);
    window.location.href = "./index.html";
});

clrScoreBtn.addEventListener("click", function () {
    console.log(`clearing high scores`);
    localStorage.clear();
    location.reload();
});