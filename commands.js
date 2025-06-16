export async function handleCommand(cmd, printLine, terminalInput, breathing, stopRandomEvents) {
  const parts = cmd.trim().split(' ');
  const baseCmd = parts[0].toLowerCase();

  switch (baseCmd) {
    case 'help':
      await printLine(
        "Available commands:\n" +
        "help - this help\n" +
        "about - system info\n" +
        "clear - clear screen\n" +
        "status - system status\n" +
        "logs - recent activity logs\n" +
        "scan - scan surroundings\n" +
        "listen - listen for sounds\n" +
        "echo - repeat text\n" +
        "whoami - identity\n" +
        "exit - close terminal"
      );
      break;

    case 'about':
      await printLine(
        "Icom v4.7\n" +
        "Experimental terminal interface\n" +
        "Status: ONLINE\n" +
        "Warning: Unauthorized access detected."
      );
      break;

    case 'clear':
      // Clear screen handled outside since terminalOutput is outside here
      return 'clear';

    case 'status':
      await printLine(
        "System integrity: 86%\n" +
        "Power: Stable\n" +
        "Sensors: Active\n" +
        "Warning: Unknown signal detected nearby."
      );
      break;

    case 'logs':
      await printLine(
        "Access Log:\n" +
        "- 02:14:23 - System reboot\n" +
        "- 02:15:01 - Sensor anomaly detected\n" +
        "- 02:15:45 - Unidentified audio detected\n" +
        "- 02:16:10 - Power fluctuation\n" +
        "- 02:16:45 - Error: Data corrupted"
      );
      break;

    case 'scan':
      await printLine(
        "Scanning surroundings...\n" +
        "Motion detected at sector 7G.\n" +
        "Temperature drop detected.\n" +
        "No visible threats detected.\n" +
        "Caution advised."
      );
      break;

    case 'listen':
      await printLine(
        "Listening...\n" +
        "You hear faint whispers, distorted breathing, and distant footsteps.\n" +
        "Are you alone?"
      );
      if (Math.random() < 0.1) {
        setTimeout(() => {
          breathing.currentTime = 0;
          breathing.play();
        }, 2000);
      }
      break;

    case 'echo':
      const echoText = parts.slice(1).join(' ');
      if (echoText) {
        await printLine(echoText);
      } else {
        await printLine("Usage: echo [text]");
      }
      break;

    case 'whoami':
      await printLine(
        "User ID: #XJ-9F2\n" +
        "Clearance level: Restricted\n" +
        "Last login: Unknown\n" +
        "Identity compromised? Unknown."
      );
      break;

    case 'exit':
      await printLine("Shutting down terminal...\nGoodbye.");
      terminalInput.disabled = true;
      if (stopRandomEvents) stopRandomEvents();
      break;

    default:
      await printLine("Command not recognized.\nType 'help' for list of commands.");
  }
}
