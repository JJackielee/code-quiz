
var quizStart = document.querySelector("#startButton");
var timeEl = document.querySelector(".timer");
var secondsLeft =75;
var quizContainer = document.querySelector(".container");
var qIterator = 0;

var qPool = [{
        qText: "Whats my Name?",
        qAnswer:["howard","Jackie","ditto","jean"],
        qCorrect: 2,
    },  {
        qText: "how old am i",
        qAnswer:["12","43","11","32"],
        qCorrect: 4,
    }];





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



function startQuiz(){
    //selector to change the question text 
    var quizQuestion = document.querySelector("#questions")
    quizQuestion.textContent = qPool[qIterator].qText;

    // removes all html elements in section from the beginning of the page for a clean canvas
    quizContainer.removeChild(quizContainer.lastElementChild);

    //creating a new section with the class answers for the buttons to sit in
    var answerBox = document.createElement("div");
    answerBox.classList.add("answers");

   
    //creating buttons for each answers in the array and appending it into the div that holds all the answer buttons
    //gives each button a class for styling as well as a data attribute so we can keep track of which is the correct answer
   
    for(i=0; i<qPool[qIterator].qAnswer.length; i++){
        var answer1 = document.createElement("button");
        answer1.classList.add("answerButton");
        answer1.setAttribute("data-number", i+1);
        answer1.textContent = qPool[qIterator].qAnswer[i];
        answerBox.appendChild(answer1);
    }

     //appending the div into the section
    quizContainer.appendChild(answerBox);

    //function to listen to onclick actions and check if answers are correct.
    testButton();
}



// listens to buttons 
function testButton(){
    //selecting on the answer boxs
    var onClick = document.querySelector(".answers");

    var hrText = document.createElement("hr");
    var alertText = document.createElement("h2");

    //event listener so when user click one of the elements in answer box it will do soemthing.
    onClick.addEventListener("click", function(event) {

        var element = event.target;
        var dataNum = element.getAttribute("data-number");

        //checks if the element that is clicked is one of the possible answers
        //if so it will iterate to the next questions but running loadQuestion function.
        // it will also show the user if they are right or wrong.
        if (element.matches(".answerButton")) {
            if(dataNum == qPool[qIterator].qCorrect){
                alertText.textContent = "Correct!";
                qIterator++;
                loadQuestions();
            } else{
                secondsLeft = secondsLeft - 10;
                alertText.textContent = "Wrong!";
                qIterator++;
                loadQuestions();  
            }
            //appends the html code so it will show user if they are right or wrong
            quizContainer.appendChild(hrText);
            quizContainer.appendChild(alertText);
        }
        
    });

}

function loadQuestions(){
    if(qIterator<qPool.length){

        var quizQuestion = document.querySelector("#questions")
        quizQuestion.textContent = qPool[qIterator].qText;

        var answerBox = document.querySelector(".answers");
        var rm = answerBox.querySelectorAll("button");
        
        for(i=0; i<rm.length; i++){
            rm[i].setAttribute("data-number", i+1);
            rm[i].textContent = qPool[qIterator].qAnswer[i];
        }

    } else {
        console.log("end of questions");
    }

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
