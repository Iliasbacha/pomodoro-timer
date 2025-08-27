let timer;
let timeLeft = 25 * 60; // 25 min work
let running = false;
let cycle = 0; // counts pomodoros

const timerDisplay = document.getElementById("timer");
const rewardDisplay = document.getElementById("reward");
const progressDisplay = document.getElementById("progress");

const rewards = [
  "Great job! 🎉",
  "Stretch & hydrate 💧",
  "One step closer 🚀",
  "Time for coffee ☕",
  "Naruto would be proud 🍜"
];

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (running) return;
  running = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
      handleCycleEnd();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = 25 * 60;
  updateDisplay();
  rewardDisplay.textContent = "";
  progressDisplay.innerHTML = "";
  cycle = 0;
}

function handleCycleEnd() {
  cycle++;
  progressDisplay.innerHTML += "🍅";

  // Show reward
  rewardDisplay.textContent = rewards[Math.floor(Math.random() * rewards.length)];

  if (cycle % 4 === 0) {
    // Long break every 4 pomodoros
    timeLeft = 15 * 60;
  } else if (cycle % 2 === 1) {
    // Break after work session
    timeLeft = 5 * 60;
  } else {
    // Work session
    timeLeft = 25 * 60;
  }

  updateDisplay();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

updateDisplay();
