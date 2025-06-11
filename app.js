const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const startingMessacges = [
    "...",
    "Initializing Icom v4.7",
    "Type 'help' for a list of commands.",

];

const commandDict = {
    help: "Available commands:\nhelp - Show this help message\nclear - Clear the terminal output\nexit - Exit the terminal\nversion - Show the current version of Icom\nabout - Show information about Icom",
    clear: "", // Will be handled specially to clear the terminal
    exit: "Exiting Icom. Goodbye!",
    version: "Icom v4.7",
    about: "Icom is a simple terminal emulator built with HTML, CSS, and JavaScript."
};
const commands = Object.keys(commandDict).map(key => `${key} - ${commandDict[key]}`);

// diplay messages one letter at a time in the terminal output
async function displayMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const output = document.createElement('div');
        terminalOutput.appendChild(output);
        for (let j = 0; j < message.length; j++) {
            output.textContent += message[j];
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 30)); // 30ms per letter
        }
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms between messages
    }
}


// Display the starting messages
displayMessages(startingMessacges);

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = terminalInput.value.trim();
        if (command) {
            const output = document.createElement('div');
            output.textContent = `> ${command}`;
            terminalOutput.appendChild(output);
            terminalInput.value = '';

            // Simulate command execution
            setTimeout(() => {
                const result = document.createElement('div');
                for (let i = 0; i < commands.length; i++) {
                    if (commands[i].startsWith(command)) {
                        alert(`Command found: ${commands[i]}`);
                        switch (commands[i]) {
                            case "help":
                                result.textContent = "Available commands:\n" + commands.join('\n');
                                break;
                            case "clear":
                                terminalOutput.innerHTML = '';
                                return; // Skip appending result
                            case "exit":
                                result.textContent = "Exiting Icom. Goodbye!";
                                terminalInput.disabled = true; // Disable input
                                break;
                            case "version":
                                result.textContent = "Icom v4.7";
                                break;
                            case "about":
                                result.textContent = "Icom is a simple terminal emulator built with HTML, CSS, and JavaScript.";
                                break;
                            default:
                                result.textContent = `Unknown command: ${command}`;
                        }
                        break;

                    }
                }
                terminalOutput.appendChild(result);
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom
            }, 500);
        }
    }
});
