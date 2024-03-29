const startBtn = document.querySelector('.start-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () =>
 {
	quizSection.classList.add('active');
	quizBox.classList.add('active');

	showQuestions(0);
	questionCounter(1);
	headerScore();
 }

 tryAgainBtn.onclick = () =>
 {
	quizBox.classList.add('active');
	nextBtn.classList.remove('active');
	resultBox.classList.remove('active');

	questionCount = 0;
	questionNumb = 1;
	userScore = 0;
	showQuestions(questionCount);
	questionCounter(questionNumb);

	headerScore();
 }

goHomeBtn.onclick = () =>
 {
	quizSection.classList.remove('active');
	nextBtn.classList.remove('active');
	resultBox.classList.remove('active');

	questionCount = 0;
	questionNumb = 1;
	userScore = 0;
	showQuestions(questionCount);
	questionCounter(questionNumb);

	headerScore();
 }

 let questionCount = 0;
 let questionNumb = 1;
 let userScore = 0;

 const nextBtn = document.querySelector('.next-btn');
 
 nextBtn.onclick = () =>
 {
	if(questionCount < questions.length - 1)
	 {
		questionCount++;
		showQuestions(questionCount);

		questionNumb++;
	    questionCounter(questionNumb);

		nextBtn.classList.remove('active');
	 }
	 else {
		showResultBox();
	 } 
 }
 
 const optionList = document.querySelector('.option-list');
 
 function showQuestions(index)
 {
	 const questionText = document.querySelector('.question-text');
	 questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
 
	 let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
		<div class="option"><span>${questions[index].options[1]}</span></div>
		<div class="option"><span>${questions[index].options[2]}</span></div>
		<div class="option"><span>${questions[index].options[3]}</span></div>`;
 
	 optionList.innerHTML = optionTag;

	 const option = document.querySelectorAll('.option')
	 for (let i = 0; i < option.length; i++)
	 {
		option[i].setAttribute('onclick', 'optionSelected(this)');
	 }
 }

 function optionSelected(answer)
 {
	let userAnswer = answer.textContent;
	let correcrAnswer = questions[questionCount].answer;
	let allOptions = optionList.children.length;

	if (userAnswer == correcrAnswer)
	{
		answer.classList.add('correct');
		userScore += 1;
		headerScore();
	}
	else
	{
		answer.classList.add('incorrect');
	}

	for (let i = 0; i < allOptions; i++)
	{
		if (optionList.children[i].textContent == correcrAnswer)
		{
			optionList.children[i].setAttribute('class', 'option correct');
		}
	}

	for (let i = 0; i < allOptions; i++)
	{
		optionList.children[i].classList.add('disabled');
	}

	nextBtn.classList.add('active')
 }

function questionCounter(index)
{
	const questionTotal = document.querySelector('.question-total');
	questionTotal.textContent = `${index} z ${questions.length} Pytań`;
}

function headerScore()
{
	const headerScoreText = document.querySelector('.header-score');
	headerScoreText.textContent = `Wynik: ${userScore} / ${questions.length}`;
}

function showResultBox()
{
	quizBox.classList.remove('active');
	resultBox.classList.add('active');

	const scoreText = document.querySelector('.score-text');
	scoreText.textContent = `Twój wynik to: ${userScore} na ${questions.length}`;

	const circularProgress = document.querySelector('.circular-progress');
	const progressValue = document.querySelector('.progress-value');
	let progressStartValue = -1;
	let progressEndValue = (userScore / questions.length) * 100;
	let speed = 20;

	let progress = setInterval(() =>
	{
		progressStartValue++;

		progressValue.textContent = `${progressStartValue}%`;
		circularProgress.style.background = `conic-gradient(#00008B ${progressStartValue * 3,6}deg, rgba(255, 255, 255, .1) 0deg)`;

		if (progressStartValue == progressEndValue)
		{
			clearInterval(progress);
		}
	}, speed);
}