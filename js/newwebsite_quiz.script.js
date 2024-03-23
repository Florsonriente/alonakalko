const questions = [
{
    question: "Choose the country I did my Master Studies in Marketing",
    answers: [
        {text: "Japan", correct: false},
        {text: "France", correct: true},
        {text: "Russia", correct: false},
        {text: "Germany", correct: false},
    ],
    correctComment: "Congratulations! You chose the correct country.To pay my studies in Master Marketing, I had to go through many challenges like waorking and studying at the same time, like team work with multiple nationalities and leraning fluently French.",
    incorrectComment: "Sorry, that's incorrect. The correct country is France. To pay my studies in Master Marketing, I had to go through many challenges like waorking and studying at the same time, like team work with multiple nationalities and leraning fluently French."
},
{
    question: "The coolest event I took part in",
    answers: [
        {text: "Talent show", correct: false},
        {text: "Dance Championship", correct: true},
        {text: "Singing competition", correct: false},
        {text: "Cooking courses", correct: false},
    ],
    correctComment: "Yes! Dance Championship is the event I'm proud to be a part of. I was dancing hip-hop and took the 14 place out of 149 participants:)",
    incorrectComment: "The correct answer is Worlwide Dance Championship where I was dancing hip-hop and took the 14 place out of 149 participants:)."

},
{
    question: "How many foreign languages did I learn",
    answers: [
        {text: "2", correct: false},
        {text: "8", correct: true},
        {text: "13", correct: false},
        {text: "5", correct: false},
    ],
    correctComment: "Yes! So many languages. I've learnt English, German, French, Spanish, Italian, Polish and Turkish. And I speak Russian too. Though I have B2 certificate in French, I use in my daily life German and at home we speak only Ukrainian.",
    incorrectComment: "No, not so many languages.I've learnt English, German, French, Spanish, Italian, Polish and Turkish. And I speak Russian too. Though I have B2 certificate in French and I miss speaking French. In my daily life I use German and at home we speak only Ukrainian."

},
{
    question: "What do other people mostly say about me?",
    answers: [
        {text: "Good designer", correct: false},
        {text: "Persistant & hardworking", correct: true},
        {text: "Has a good feeling of German", correct: false},
        {text: "Needs always wine for motivation", correct: false},
    ],
    correctComment: "Yep!!! I also do think so!!!",
    incorrectComment: "No, not really. People usually say that Im very engaged and hardworking, goal-oriented person. "

}

];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizComments = document.getElementById("comments");

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
                  }
           
            
        button.addEventListener("click", selectAnswer);
    }

    );

}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    quizComments.style.display = "none";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
        quizComments.style.display = "flex"; // Display comments when the answer is correct
        quizComments.innerHTML = questions[currentQuestionIndex].correctComment;
    }else {

        selectedBtn.classList.add("incorrect");
        quizComments.style.display = "flex"; // Display comments when the answer is incorrect
        quizComments.innerHTML = questions[currentQuestionIndex].incorrectComment;
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
                    }
                    button.disabled = true;
    });
    nextButton.style.display = "flex";
}

function showScore(){
    resetState();
    /*  */if (score === 1 || score === 2 || score === 0){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Thanks for trying! Seems like we need to meet for a coffee to get to know each other better! `;
    } else if (score === 3) 
    {questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Wow you seem to know me very well! How do you??? ;)`;
} else {questionElement.innerHTML = `Woooooooowwww!!! You scored ${score} out of ${questions.length}! I'm so excited!!! Thanks for trying! `;}
   
   // questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "flex";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
    }


nextButton.addEventListener("click" , () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});



startQuiz();
