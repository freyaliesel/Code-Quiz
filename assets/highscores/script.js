var highScores =  JSON.parse(localStorage.getItem("highScores"));
var listEl = document.querySelector("ul");

console.log(highScores);

// function to compare properties of the objects in the high score array
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
}
highScores.sort(compare);
console.log(highScores);

function displayScores() {
    for (var score of highScores) {
        console.log(score);
        var li = document.createElement("li");
        listEl.appendChild(li);
        li.textContent = (`${score.name} - ${score.score}`);

    }
}

displayScores();