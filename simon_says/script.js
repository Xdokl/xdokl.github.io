document.addEventListener("DOMContentLoaded", () => {
  const buttons = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let playerSequence = [];
  let level = 0;

  const scoreDisplay = document.getElementById('score');

  document.getElementById('start-button').addEventListener('click', startGame);

  document.getElementById('level-slider').addEventListener('input', (e) => {
    document.getElementById('slider-value').textContent = `${e.target.value} Beats`;
  });

  buttons.forEach(color => {
    const btn = document.getElementById(color);
    btn.addEventListener('click', () => handlePlayerInput(color));
  });

function startGame() {
  document.getElementById('controls').style.display = 'none'; // hide entire control block

  const startLevel = parseInt(document.getElementById('level-slider').value, 10);
  sequence = [];
  playerSequence = [];
  level = startLevel;

  for (let i = 0; i < startLevel; i++) {
    const nextColor = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(nextColor);
  }

  scoreDisplay.textContent = `Level: ${level}`;
  playSequence();
}



function playSequence() {
  const flashTime = parseInt(document.getElementById('timer-slider').value, 10);
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    activateButton(color, flashTime);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, flashTime + 300); // adds buffer
}



  function activateButton(color) {
    const btn = document.getElementById(color);
    const sound = document.getElementById(`sound-${color}`);

    btn.classList.add('active');
    sound.currentTime = 0;
    sound.play();

    setTimeout(() => {
      btn.classList.remove('active');
    }, 400);
  }

  function handlePlayerInput(color) {
    activateButton(color);
    playerSequence.push(color);
    const currentStep = playerSequence.length - 1;

    if (playerSequence[currentStep] !== sequence[currentStep]) {
      alert('Wrong sequence! Game over.');
      document.getElementById('start-button').style.display = 'block';
      return;
    }

    if (playerSequence.length === sequence.length) {
      setTimeout(nextLevel, 1000);
    }
  }

  function nextLevel() {
    level++;
    scoreDisplay.textContent = `Level: ${level}`;
    playerSequence = [];
    const nextColor = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(nextColor);
    playSequence();
  }
});
