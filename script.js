
var quizStart = document.querySelector("#startButton");
var timeEl = document.querySelector(".timer");
var secondsLeft =75;
var quizContainer = document.querySelector(".container");

var quest = {
    qText: "test",
    qAnswer:["1","2","3","4"],
    qCorrect: 2,
    
  }

//Starts the timer and intitiae the quiz with function startQuiz 
quizStart.addEventListener("click", function() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    startQuiz();
});

//function that removes all the content in the main tag so we will have a clean slate to add quiz content and answers
function startQuiz(){
    var quizQuestion = document.querySelector("#questions")
    //removes all html elements in section for a clean canvas
    //creates a div to place all the possible answers for the question
    //adds a class to the div for styling
    quizContainer.removeChild(quizContainer.lastElementChild);
    var answerBox = document.createElement("div");
    answerBox.classList.add("answers");

    //changes questions in the h1 tag
    //creating buttons for each answers in the array and appending it into the div that holds all the answer buttons
    //gives each button a class for styling as well as a data attribute so we can keep track of which is the correct answer
    //appending the div into the section
    quizQuestion.textContent = quest.qText;
    for(i=0; i<quest.qAnswer.length; i++){
        var answer1 = document.createElement("button");
        answer1.classList.add("test");
        answer1.setAttribute("data-number", i+1);
        answer1.textContent = quest.qAnswer[i];
        answerBox.appendChild(answer1);
    }
    quizContainer.appendChild(answerBox);

    testButton();
}



// listens to buttons 
function testButton(){

    var test1 = document.querySelector(".answers");
    var hrText = document.createElement("hr");
    var alertText = document.createElement("h2");

    test1.addEventListener("click", function(event) {
        var element = event.target;
        var boop = element.getAttribute("data-number");
    
        if (element.matches(".test")) {
            if(boop == quest.qCorrect){
                console.log("correct!");
                quizContainer.appendChild(hrText);
                alertText.textContent = "Correct!";
                quizContainer.appendChild(alertText);
                

            } else{
                secondsLeft = secondsLeft - 10;
                console.log("wrong");
                quizContainer.appendChild(hrText);
                alertText.textContent = "Wrong!";
                quizContainer.appendChild(alertText);
            }
    
        }
        
    });

}





    // var answer1 = document.createElement("button");
    // var answer2 = document.createElement("button");
    // var answer3 = document.createElement("button");
    // var answer4 = document.createElement("button");

    // answer1.classList.add("test");
    // answer2.classList.add("test");
    // answer3.classList.add("test");
    // answer4.classList.add("test");
    
    //appending the buttons into the div that contains possible answers
    // answerBox.appendChild(answer1);
    // answerBox.appendChild(answer2);
    // answerBox.appendChild(answer3);
    // answerBox.appendChild(answer4)
