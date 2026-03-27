const questions = [
  {
    question: 'Apa judul lagu urutan pertama yang kamu dengerin tadi?',
    options: ['Nightmare', 'So Far Away', 'Little Piece Of Heaven', 'Dont Look Back in Anger'],
    answer: 2
  },
  {
    question: 'Apa model gitar yang selalu aku impi impikan selama ini selain gitar dari kamu?',
    options: ['Hollow Body', 'Stratocaster', 'Telecaster', 'Les Paul'],
    answer: 0
  },
  {
    question: 'Apa hal yang paling aku suka dari kamu?',
    options: ['Di puk puk', 'Di pijit', 'Di cubit', 'Di ketlikin'],
    answer: 0
  },
  {
    question: 'Apa judul dongeng yang sering aku bacain ke kamu sebelum tidur?',
    options: ['Asal Usul Danau Toba', 'Snow White', 'Rapunzel', 'Cinderella'],
    answer: 3
  },
  {
    question: 'Hewan apa yang pengen banget aku pelihara?',
    options: ['Kucing', 'Badak', 'Gajah', 'Kangguru'],
    answer: 1
  }
];

const quizContainer = document.getElementById('quizContainer');
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

if (quizContainer && quizForm) {
  questions.forEach((item, qIndex) => {
    const block = document.createElement('div');
    block.className = 'quiz-block';

    const optionsHtml = item.options
      .map((option, oIndex) => {
        return `
          <label class="quiz-option">
            <input type="radio" name="question-${qIndex}" value="${oIndex}" required>
            <span>${option}</span>
          </label>
        `;
      })
      .join('');

    block.innerHTML = `
      <h3>${qIndex + 1}. ${item.question}</h3>
      <div class="quiz-options">${optionsHtml}</div>
    `;

    quizContainer.appendChild(block);
  });

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let score = 0;

    questions.forEach((item, qIndex) => {
      const selected = quizForm.querySelector(`input[name="question-${qIndex}"]:checked`);
      if (selected && Number(selected.value) === item.answer) {
        score += 1;
      }
    });

    quizResult.textContent = `Kamu dapat ${score}/${questions.length}. Apa pun skornya, kamu tetap paling spesial 💖`;
    unlockStep('closing');

    setTimeout(() => {
      window.location.href = '/hub.html';
    }, 1500);
  });
}