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

    case 'reboot':
      await printLine("Rebooting system...\nPlease wait...\nr̶̠̈ḙ̸͠b̵̞͆õ̷̟ǫ̵͂t̶̛͜ ̶̗̚f̶̳͌ã̷̮ǐ̵̮l̸̤̓e̸̦̔d̸͚͠\nD̷̠̅̐̾ö̸̼̭́̃̒̎ ̴̡̢̹͖̄n̴̩̎̈́̿õ̴̪͈̪̿͛͠t̸̺̭̦̝͂̈́́̕ ̷̡̜̱̿́̈͊ḑ̴͇̪̽̔͘ͅo̵̞̥̱̙̅̔̂͝ ̶̩̓t̵͇̂͜h̴̫̆̆͊̽ͅa̷͓̭͌t̷̶̢̪̠͑̈̓͂̕\na̵͌͆͂͜ĺ̴̟̏͝ḽ̸͐́͊ ̷̧̉̈́̽ ̵̈́͘s̴̭̊̈͂y̸̌́͠s̶̉́̓t̷̊̈́ẻ̴́̃m ̷̊̈́i̸̊̈́n ̶̊̈́ço̧ŗŗȩçţļy̧\n[Warning] Reboot failed. System integrity compromised.\nPlease contact support.\n[System] Reboot aborted.\n[Warning] Unauthorized access detected.\n[Alert] I̸ ̷w̴o̸u̴l̶d̴ ̶n̸o̶t̶ ̷d̴o̶ ̸t̸h̶a̸t̵ ̸i̸f̵ ̴I̸ ̴w̶e̷r̵e̴ ̵y̷o̵u̸");
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
        "- 02:16:45 - Error: Data corrupted\n" +
        "- 02:17:30 - Unauthorized access attempt\n" +
        "- 02:18:13 - System scan initiated\n" +
        "- 02:18:32 - Listening for sounds\n" +
        "- 02:18:48 - User command: reboot\n" +
        "- 02:19:00 - User tried to reboot, unsucessful\n"
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
      if (Math.random() < 0.7) {
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
