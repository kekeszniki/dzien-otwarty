const startBtn = document.querySelector('.start-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

startBtn.onclick = () =>
 {
	quizSection.classList.add('active');
	quizBox.classList.add('active');
 }