var highscoreList = document.querySelector(".highscoreContainer");
var clickThis = document.querySelector(".clickThis");


function loadHighscore(){
    var highscorePool = JSON.parse(localStorage.getItem("highscores"));
    
    for(var i = 0; i< highscorePool.length; i++){
        var createList = document.createElement("li");
        createList.textContent = highscorePool[i].name + " - " + highscorePool[i].score;
        highscoreList.appendChild(createList);
    }

}

clickThis.addEventListener("click", function(event){
    document.querySelector(".highscoreContainer").innerHTML='';
    var newList = [];
    localStorage.setItem("highscores", JSON.stringify(newList));
    loadHighscore();

});

loadHighscore();