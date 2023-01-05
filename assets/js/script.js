//selectors that can be accessible throughout the entire scope/code. 
var quizStart = document.querySelector(".startButton");
var timeEl = document.querySelector(".timer");
var quizQuestion = document.querySelector(".questions")
var quizContainer = document.querySelector(".container");
// made an iterator so we can keep track of which question we're currently on as well as determine if the game ends
var qIterator = 0;
// the starting amount of time for the quiz. 
var secondsLeft =75;

//array of questions in object form.

var qPool = [{
        qText: "Javascript is an _______ language?",
        qAnswer:["Object-Oriented","Object-Based","Procedural","None of the above"],
        qCorrect: 1,
    },  {
        qText: "Which of the following keyword is used to define a variable in Javascript?",
        qAnswer:["let","var","Both var and let","none of the above"],
        qCorrect: 3,
    },{
        qText: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        qAnswer:["Throws an error","Ignores the statements","Gives a warning","None of the above"],
        qCorrect: 2,
    },{
        qText: "How can a datatype be declared to be a constant type?",
        qAnswer:["const","var","let","constant"],
        qCorrect: 1,
    },{
        qText: "When an operator's value is NULL, the typeof returned by the unary operator is",
        qAnswer:["Boolean","Undefine","Object","Integer"],
        qCorrect: 3,
    },{
        qText: "Which function is used to serialize an object into a JSON string in Javascript?",
        qAnswer:["stringify()","parse()","convert()","None of the above"],
        qCorrect: 1,
    },{
        qText: "Which of the following is not a Javascript framework?",
        qAnswer:["Node","Vue","React","Cassandra"],
        qCorrect: 4,
    },
    {
        qText: "How to stop an interval timer in Javascript?",
        qAnswer:["clearTimer","clearInterval","intervalOver","setInterval"],
        qCorrect: 2,
    }];





//Starts the timer and intitiae the quiz with function startQuiz 
quizStart.addEventListener("click", function() {
    var timerInterval = setInterval(function() {
        
        timeEl.textContent = secondsLeft;
        if(secondsLeft == 0 || qIterator >= 8) {
          clearInterval(timerInterval);
          sumbitScore();

        } else {
            secondsLeft--;
        }
        
      }, 1000);
    startQuiz();
});



function startQuiz(){
    //selector to change the question text 
    quizQuestion.textContent = qPool[qIterator].qText;

    // removes all html elements in section from the beginning of the page for a clean canvas
    quizContainer.removeChild(quizContainer.lastElementChild);

    //creating a new section with the class answers for the buttons to sit in
    var answerBox = document.createElement("div");
    answerBox.classList.add("answers");

    
    //creating a new section with class .results for the text "correct" and "wrong" when user answers questions
    var resultBox = document.createElement("div");
    resultBox.classList.add("results");

   
    //creating buttons for each answers in the array and appending it into the div that holds all the answer buttons
    //gives each button a class for styling as well as a data attribute so we can keep track of which is the correct answer
   
    for(var i=0; i<qPool[qIterator].qAnswer.length; i++){
        var answer1 = document.createElement("button");
        answer1.classList.add("answerButton");
        answer1.setAttribute("data-number", i+1);
        answer1.textContent = qPool[qIterator].qAnswer[i];
        answerBox.appendChild(answer1);
    }

     //appending the div into the section
    quizContainer.appendChild(answerBox);
    quizContainer.appendChild(resultBox);

    //function to listen to onclick actions and check if answers are correct.
    testButton();
}



// listens to buttons 
function testButton(){
    //selecting on the answer boxs
    var onClick = document.querySelector(".answers");

    var hrText = document.createElement("hr");
    var alertText = document.createElement("h2");
    var results = document.querySelector(".results");

    //event listener so when user click one of the elements in answer box it will do soemthing.
    onClick.addEventListener("click", function(event) {

        var element = event.target;
        var dataNum = element.getAttribute("data-number");
        console.log(qIterator);
        //checks if the element that is clicked is one of the possible answers
        //if so it will iterate to the next questions but running loadQuestion function.
        // it will also show the user if they are right or wrong.
        if (element.matches(".answerButton") && qIterator<qPool.length) {
            if(dataNum == qPool[qIterator].qCorrect){
                alertText.textContent = "Correct!";
                qIterator++;
                loadQuestions();
            } else{
                if(secondsLeft < 10){
                    secondsLeft = 0;
                } else{
                    secondsLeft = secondsLeft - 10;
                }
                alertText.textContent = "Wrong!";
                qIterator++;
                loadQuestions();  
            }
            //appends the html code so it will show user if they are right or wrong
            console.log(results);
            results.appendChild(hrText);
            results.appendChild(alertText);
        }
               
    });
}


//function that gets called after each question is answered. 
// it checks if our iterator is less than the amount of question in our pool of question.
// if its less than then it means we have more questions to answer
// using queryselecterall method to put all the buttons into an array
// uses a forloop to gothrough the array to change the button attributes and text.
function loadQuestions(){
    if(qIterator<qPool.length){

        quizQuestion.textContent = qPool[qIterator].qText;

        var answerBox = document.querySelector(".answers");
        var rm = answerBox.querySelectorAll("button");

        for(var i=0; i<rm.length; i++){
            rm[i].setAttribute("data-number", i+1);
            rm[i].textContent = qPool[qIterator].qAnswer[i];
        }
    } 

}


//submitScore function that only gets ran when the quiz is over. quiz is over when timer reaches 0 or iterator is a bigger 
// number than the length of array in the pool of questions.
// it first removes all the elements so the questions and the button on the page.
//then it creates an container so we can create a form in the container to ask for intial
// it then stores the score and intial into the local storage and directs the page to the highscore page.

function sumbitScore(){
    quizContainer.removeChild(quizContainer.lastElementChild);
    quizContainer.removeChild(quizContainer.lastElementChild);
    quizContainer.removeChild(quizContainer.lastElementChild);


    var header = document.createElement("h1");

    header.textContent = "All done!";

    var container = document.createElement("div");
    container.classList.add("highscore");

    var score = document.createElement("h2");
    score.textContent = "Your Score is: " + secondsLeft;
    

    var label = document.createElement("label");
    label.textContent = "Enter Initials: "
    var inputField = document.createElement("input");
    inputField.setAttribute("required","");
    inputField.setAttribute("maxlength", "2");
    

    var hsForm = document.createElement("form");
 
    
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";

    //when button is clicked we want to send data local storage and redirect page to highscore page
    // used preventDefault() to stop the default action of the form
    hsForm.addEventListener('submit', function(event){
        event.preventDefault();
        var oldEntry = JSON.parse(localStorage.getItem("highscores")) || [];
        var newEntry = {
            name: inputField.value.toUpperCase(), 
            score: secondsLeft
        }
        oldEntry.push(newEntry);
        localStorage.setItem("highscores", JSON.stringify(oldEntry));
        location.href = "highscore.html";

    })


    //appends all the created element into their parents to show on screen
    hsForm.appendChild(label);
    hsForm.appendChild(inputField);
    container.appendChild(header);
    container.appendChild(score);
    hsForm.appendChild(submitButton)
    container.appendChild(hsForm);
    quizContainer.appendChild(container);
}