// script.js

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const userForm = document.getElementById('user-form');
  const userFormContainer = document.getElementById('user-form-container');
  const quizContainer = document.getElementById('quiz-container');
  const reviewContainer = document.getElementById('review-container');
  const resultContainer = document.getElementById('result-container');
  const highScoreContainer = document.getElementById('highscore-container');

  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const questionNumber = document.getElementById('question-number');
  const timerDisplay = document.getElementById('timer');
  const reviewList = document.getElementById('review-list');
  const scoreDisplay = document.getElementById('score');
  const highScoreList = document.getElementById('highscore-list');

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const reviewBtn = document.getElementById('review-btn');
  const finalSubmitBtn = document.getElementById('final-submit-btn');
  const retryBtn = document.getElementById('retry-btn');
  const exportBtn = document.getElementById('export-btn');
  const highScoreBtn = document.getElementById('highscore-btn');
  const backBtn = document.getElementById('back-btn');

  // Quiz Data
 const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<heading>", "<head>", "<h1>"],
    answer: "<h1>"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color"
  },
  {
    question: "Inside which HTML element do we put the JavaScript code?",
    options: ["<script>", "<javascript>", "<js>", "<code>"],
    answer: "<script>"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction()",
      "function = myFunction()",
      "create.myFunction()",
      "def myFunction()"
    ],
    answer: "function myFunction()"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["src", "title", "alt", "longdesc"],
    answer: "alt"
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["<style>", "<css>", "<link>", "<stylesheet>"],
    answer: "<link>"
  },
  {
    question: "How do you add a comment in HTML?",
    options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
    answer: "<!-- comment -->"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>"
  },
  {
    question: "What is the correct syntax to link JavaScript to HTML?",
    options: [
      "<script src='script.js'>",
      "<js href='script.js'>",
      "<link rel='script' href='script.js'>",
      "<javascript src='script.js'>"
    ],
    answer: "<script src='script.js'>"
  },
  {
    question: "How do you apply styles to a specific element using CSS?",
    options: [
      "tagname { property: value; }",
      ".class { property: value; }",
      "#id { property: value; }",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Which JavaScript event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    answer: "onclick"
  },
  {
    question: "Which CSS property is used to make text bold?",
    options: ["font-weight", "font-style", "text-bold", "weight"],
    answer: "font-weight"
  },
  {
    question: "What is the purpose of the <br> tag in HTML?",
    options: [
      "Break the page",
      "Insert a horizontal line",
      "Break a line",
      "Start a new paragraph"
    ],
    answer: "Break a line"
  },
  {
    question: "Which input type is used to get an email from the user?",
    options: ["input-email", "type='email'", "email-input", "form-email"],
    answer: "type='email'"
  },
  {
    question: "What is the default position value of an HTML element in CSS?",
    options: ["relative", "absolute", "fixed", "static"],
    answer: "static"
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["var myVar", "variable myVar", "v myVar", "let myVar = value"],
    answer: "let myVar = value"
  },
  {
    question: "Which tag is used to embed a video in HTML?",
    options: ["<media>", "<video>", "<embed>", "<movie>"],
    answer: "<video>"
  },
  {
    question: "Which tag defines a cell in an HTML table?",
    options: ["<tr>", "<table>", "<td>", "<th>"],
    answer: "<td>"
  },
  {
    question: "How do you select an element with id 'header' in CSS?",
    options: ["#header", ".header", "header", "$header"],
    answer: "#header"
  },
  {
    question: "Which HTML element is used to define important text?",
    options: ["<b>", "<i>", "<strong>", "<em>"],
    answer: "<strong>"
  },
  {
    question: "Which method is used to write content into the browser in JavaScript?",
    options: [
      "document.write()",
      "window.write()",
      "console.log()",
      "write()"
    ],
    answer: "document.write()"
  },
  {
    question: "Which CSS unit is relative to the font-size of the element?",
    options: ["px", "em", "%", "cm"],
    answer: "em"
  }
];

  let currentQuestionIndex = 0;
  let userAnswers = new Array(questions.length).fill(null);
  let timer;
  let timeLeft = 25 * 60; // 25 minutes in seconds

  // Start Timer
  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitQuiz();
      } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
    }, 1000);
  }

  // Load Question
  function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    optionsContainer.innerHTML = '';
    questionText.textContent = question.question;

    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.classList.add('option-btn');
      if (userAnswers[currentQuestionIndex] === option) {
        btn.classList.add('selected');
      }
      btn.addEventListener('click', () => {
        userAnswers[currentQuestionIndex] = option;
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      optionsContainer.appendChild(btn);
    });

    // Button Visibility
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
    submitBtn.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);
    reviewBtn.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);
  }
  
  document.getElementById('submit-btn').addEventListener('click', submitQuiz);

  document.getElementById('review-btn').addEventListener('click', () => {
    quizContainer.classList.add('hidden');
    reviewContainer.classList.remove('hidden');
    loadReview();
  });

  document.getElementById('final-submit-btn').addEventListener('click', () => {
    reviewContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    calculateScore();
  });

  // Submit Quiz
  function submitQuiz() {
    clearInterval(timer);
    quizContainer.classList.add('hidden');
    reviewContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    let score = 0;
    reviewList.innerHTML = '';

    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index] || "No answer";
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) score++;

      const div = document.createElement('div');
      div.classList.add('review-item');
      div.classList.add(isCorrect ? 'correct' : 'incorrect');
      div.innerHTML = `
        <strong>Q${index + 1}: ${q.text}</strong>
        <p>Your Answer: ${userAnswer}</p>
        <p>Correct Answer: ${q.answer}</p>
      `;
      reviewList.appendChild(div);
      exportResults()
    });

    scoreDisplay.textContent = `${score} / ${questions.length}`;
    updateHighScores(score);
  }

  // Update High Scores
  function updateHighScores(score) {
    const name = document.getElementById('name').value;
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }

  // Show High Scores
    
  function showHighScores() {
    highScoreContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    highScoreList.innerHTML = '';

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.slice(0, 10).forEach((entry, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
      highScoreList.appendChild(li);
    });
  }

  function exportResults() {
    let content = '';
    questions.forEach((q, i) => {
      const userAnswer = userAnswers[i] || 'No answer';
      content += `Q${i + 1}: ${q.question}\nYour Answer: ${userAnswer}\nCorrect Answer: ${q.answer}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Event Listeners
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userFormContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
    startTimer();
  });

  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    }
  });

  function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score++;
      }
    });
    scoreElement.textContent = score;
  }


  submitBtn.addEventListener('click', () => {
    submitQuiz();
  });

  reviewBtn.addEventListener('click', () => {
    quizContainer.classList.add('hidden');
    reviewContainer.classList.remove('hidden');
  });

  finalSubmitBtn.addEventListener('click', () => {
    submitQuiz();
  });

  retryBtn.addEventListener('click', () => {
    location.reload();
  });

  highScoreBtn.addEventListener('click', showHighScores);
  exportBtn.addEventListener('click', exportResults);
  

  backBtn.addEventListener('click', () => {
    highScoreContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
  });
});


 

  