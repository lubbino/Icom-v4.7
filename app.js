import { handleCommand } from './commands.js';

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const typeSound = document.getElementById('typeSound');
const breathing = document.getElementById('breathing');

// Boot ASCII animation lines
const bootLines = [
  "Initializing terminal...",
  "Boot sequence started...",
  "[ OK ] Memory test passed",
  "[ OK ] Audio device detected",
  "[ ERROR ] Power fluctuation detected",
  "[ OK ] Loading system modules...",
  "[ OK ] Network interface initialized",
  "[ WARNING ] Sensor calibration required",
  "[ INFO ] System time synchronized",
  "[ INFO ] Starting background processes...",
  "[ INFO ] Loading user configuration...",
  "[ ALERT ] Unusual activity detected",
  "[ INFO ] Applying system updates...",
  "[ INFO ] Security protocols engaged",
  "[ INFO ] Starting main application...",
  "Welcome to Icom v4.7",
  "Type 'help' for available commands.",
  ""
];

let lineIndex = 0;
let randomEventTimeout;

// Play boot lines one by one, only printing next after current finishes
async function playBootLines() {
  if (lineIndex < bootLines.length) {
    await printLine(bootLines[lineIndex]);
    lineIndex++;
    setTimeout(playBootLines, 300);
  } else {
    terminalInput.disabled = false;
    terminalInput.focus();
    startRandomEvents();
  }
}

// Print line with typing effect and return a promise that resolves when done
function printLine(text, speed = 50) {
  return new Promise(resolve => {
    const div = document.createElement('div');
    terminalOutput.appendChild(div);
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        div.textContent += text.charAt(i);
        if (typeSound) {
          typeSound.currentTime = 0;
          typeSound.play();
        }
        // Horrify the user with a glitch effect
        if (Math.random() < 0.05) { // 5% chance to glitch
          div.classList.add('glitch');
          setTimeout(() => div.classList.remove('glitch'), 100);
        }
        // Add CRT flicker effect
        if (Math.random() < 0.1) { // 10% chance to flicker
          terminalOutput.classList.add('flicker');
          setTimeout(() => terminalOutput.classList.remove('flicker'), 100);
        }
        i++;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        setTimeout(typeChar, speed);
      } else {
        resolve();
      }
    }

    typeChar();
  });
}

// Disable input during boot
terminalInput.disabled = true;

// Play typing sound on input events
terminalInput.addEventListener('input', () => {
  if (typeSound) {
    typeSound.currentTime = 0;
    typeSound.play();
  }
});

// Handle Enter key for commands
terminalInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = terminalInput.value.trim();
    if (input !== '') {
      terminalInput.disabled = true;
      await printLine(`\n$ ${input}`);

      const result = await handleCommand(input, printLine, terminalInput, breathing, stopRandomEvents);
      if (result === 'clear') {
        terminalOutput.innerHTML = '';
      }

      terminalInput.value = '';
        terminalInput.disabled = false;
        terminalInput.focus();
    }
  }
});

// --- Random events system ---

function startRandomEvents() {
  scheduleNextEvent();
}

function stopRandomEvents() {
  if (randomEventTimeout) {
    clearTimeout(randomEventTimeout);
    randomEventTimeout = null;
  }
}

function scheduleNextEvent() {
  // Schedule a random event between 10 and 25 seconds
  const delay = 20000 + Math.random() * 20000;
  randomEventTimeout = setTimeout(triggerRandomEvent, delay);
}

async function triggerRandomEvent() {
  const events = [
    async () => {
      await printLine("[Warning] Sensor glitch detected...");
    },
    async () => {
      await printLine("[Alert] Unusual audio interference.");
      if (Math.random() < 0.3) {
        breathing.currentTime = 0;
        breathing.play();
      }
    },
    async () => {
      await printLine("[Notice] Power fluctuation recorded.");
    },
    async () => {
      await printLine("[System] Memory usage spike detected.");
    },
    async () => {
      await printLine("[Error] Data stream corrupted.");
    }
  ];

  // Pick a random event and run it
  const event = events[Math.floor(Math.random() * events.length)];
  await event();

  terminalInput.disabled = false;
  terminalInput.focus();

  // Schedule next event
  scheduleNextEvent();
}

// Start the boot sequence on script load
playBootLines();
