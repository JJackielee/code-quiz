var highscoreList = document.querySelector(".highscoreContainer");
var clickThis = document.querySelector(".clickThis");


//loadHighscore function that grabs data from local storage and creates LI to append to the list of highscores
//localstorage stores a array of objects
//uses a for loop to loop through the array and then display every index as highscore
function loadHighscore(){
    var highscorePool = JSON.parse(localStorage.getItem("highscores"));
    
    for(var i = 0; i< highscorePool.length; i++){
        var createList = document.createElement("li");
        createList.textContent = highscorePool[i].name + " - " + highscorePool[i].score;
        highscoreList.appendChild(createList);
    }

}

//eventlistener that listen to the button on the page to clear highscore
//when user clicks the button it will clear the html in the UL which will utlimately clear all the highscore <li>
//it also declares a new array and replace that empty array into the local storage. 
clickThis.addEventListener("click", function(event){
    document.querySelector(".highscoreContainer").innerHTML='';
    var newList = [];
    localStorage.setItem("highscores", JSON.stringify(newList));

});

//loadHighscore funciton to run when the page loads. 
loadHighscore();