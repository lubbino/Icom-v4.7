const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

let gameState = {
  unlockedLogs: false,
  triggeredReboot: false,
  heardWhisper: false
};

let commandHistory = [];
let historyIndex = -1;

const commands = {
  help: {
    description: "List available commands",
    action: () => {
      const output = Object.keys(commands).map(cmd => `> ${cmd}`);
      displayMessages(output);
    }
  },
  clear: {
    description: "Clear the screen",
    action: () => terminalOutput.innerHTML = ''
  },
  status: {
    description: "Check system status",
    action: () => {
      displayMessages([
        "Checking system integrity...",
        "S̶y̷s̸t̵e̸m̴ a̵n̷o̸m̶a̵l̸y̵ d̶e̴t̸e̵c̷t̸e̴d̴.",
        "W̴͎͚̐ë̵̘̦́ ̴̠̳̿ș̸̯̔e̸̟̓e̶̹̎ ̸͚̗̀y̵̻͘ȏ̴̻u̷͎̓."
      ], "glitch");
      maybeGlitch();
    }
  },
  reboot: {
    description: "Attempt system reboot",
    action: () => {
      displayMessages([
        "Restarting Icom V4.7...",
        "Bios check: █▒▒▒▒▒▒▒▒▒▒",
        "Rest̴̡̳́a̵̲͕͗͋r̶̢̐ẗ̷͕́ ̸̢͆f̶̢͂ą̶̕i̸͍̊l̸͍͑ḛ̵͌d̵̝͐.",
        "I told you not to do that."
      ], "glitch");
      gameState.triggeredReboot = true;
      maybeGlitch(true);
    }
  },
  "read log": {
    description: "Access encrypted log",
    action: () => {
      if (!gameState.unlockedLogs) {
        displayMessages("ACCESS DENIED.");
      } else {
        displayMessages([
          "Log Entry #042:",
          "They are not *in* the system.",
          "They *are* the system."
        ]);
      }
    }
  },
  "unlock logs": {
    description: "Bypass security",
    action: () => {
      ask("Bypass logs security? (yes/no)", ["yes", "no"], (choice) => {
        if (choice === "yes") {
          gameState.unlockedLogs = true;
          displayMessages("Logs unlocked.");
        } else {
          displayMessages("Abort.");
        }
      });
    }
  },
  "strange.exe": {
    description: "Run strange program",
    action: () => {
      ask("It wants to speak. Allow it? (yes/no)", ["yes", "no"], (choice) => {
        if (choice === "yes") {
          gameState.heardWhisper = true;
          displayMessages([
            "You hear whispering in the wires...",
            "It knows your name."
          ], "glitch");
          maybeGlitch(true);
        } else {
          displayMessages("The silence hums louder.");
        }
      });
    }
  }
};

function displayMessages(messages, effect = "") {
  if (typeof messages === "string") messages = [messages];
  messages.forEach((msg) => {
    const line = document.createElement("div");
    line.textContent = msg;
    if (effect === "glitch") line.classList.add("glitch-text");
    terminalOutput.appendChild(line);
  });
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function maybeGlitch(force = false) {
  if (force || Math.random() < 0.2) {
    document.body.classList.add("glitch");
    setTimeout(() => document.body.classList.remove("glitch"), 1000);
  }
}

function ask(prompt, options, callback) {
  displayMessages(prompt);
  terminalInput.disabled = false;
  terminalInput.focus();

  const listener = function (e) {
    if (e.key === "Enter") {
      const input = terminalInput.value.trim().toLowerCase();
      terminalInput.value = "";
      terminalInput.removeEventListener("keydown", listener);

      if (options.includes(input)) {
        callback(input);
      } else {
        displayMessages("Invalid choice.");
        ask(prompt, options, callback);
      }
    }
  };

  terminalInput.addEventListener("keydown", listener);
}

terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = terminalInput.value.trim().toLowerCase();
    terminalInput.value = "";
    commandHistory.push(input);
    historyIndex = commandHistory.length;

    const command = commands[input];
    if (command) {
      command.action();
    } else {
      displayMessages(`Unknown command: ${input}`);
    }
  } else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      terminalInput.value = "";
    }
  }
});
