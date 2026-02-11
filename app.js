const timerDisplay = document.getElementById("timerDisplay");
const activeTaskLabel = document.getElementById("activeTask");
const taskInput = document.getElementById("taskName");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");
const bookingsList = document.getElementById("bookingsList");
const bookingTemplate = document.getElementById("bookingTemplate");

let timerId = null;
let startedAt = null;
let elapsedMs = 0;
let currentTask = "";

const STORAGE_KEY = "task-timer-bookings";
let bookings = loadBookings();
renderBookings();
updateTimer();

startBtn.addEventListener("click", () => {
  if (timerId) {
    return;
  }

  const proposedTask = taskInput.value.trim();
  if (!proposedTask) {
    taskInput.focus();
    return;
  }

  currentTask = proposedTask;
  startedAt = Date.now() - elapsedMs;
  timerId = setInterval(updateTimer, 250);
  activeTaskLabel.textContent = `Timing: ${currentTask}`;
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  if (!timerId) {
    return;
  }

  clearInterval(timerId);
  timerId = null;
  elapsedMs = Date.now() - startedAt;

  const booking = {
    id: crypto.randomUUID(),
    task: currentTask,
    durationMs: elapsedMs,
    bookedAt: new Date().toISOString(),
  };

  bookings.unshift(booking);
  persistBookings();
  renderBookings();

  resetTimerState();
});

resetBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  resetTimerState();
});

clearBtn.addEventListener("click", () => {
  bookings = [];
  persistBookings();
  renderBookings();
});

function resetTimerState() {
  elapsedMs = 0;
  startedAt = null;
  currentTask = "";
  taskInput.value = "";
  activeTaskLabel.textContent = "No active task";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  updateTimer();
}

function updateTimer() {
  if (timerId) {
    elapsedMs = Date.now() - startedAt;
  }

  timerDisplay.textContent = formatDuration(elapsedMs);
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function loadBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function renderBookings() {
  bookingsList.innerHTML = "";

  if (bookings.length === 0) {
    const empty = document.createElement("li");
    empty.className = "booking-item";
    empty.textContent = "No booked tasks yet.";
    bookingsList.append(empty);
    return;
  }

  for (const booking of bookings) {
    const fragment = bookingTemplate.content.cloneNode(true);
    fragment.querySelector(".booking-task").textContent = booking.task;
    fragment.querySelector(".booking-meta").textContent = new Date(
      booking.bookedAt,
    ).toLocaleString();
    fragment.querySelector(".booking-duration").textContent = formatDuration(
      booking.durationMs,
    );
    bookingsList.append(fragment);
  }
}
