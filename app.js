const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const startingMessacges = [
    "...",
    "Initializing Icom v4.7",
    "Type 'help' for a list of commands.",

];

const commandDict = {
    help: "Available commands:\n" +
        "help - Show this help message\n" +
        "clear - Clear the terminal output\n" +
        "reboot - Restart the Icom system\n" +
        "version - Show the current version of Icom\n" +
        "status - Show the current system status\n" +
        "read log.txt - Read the log file\n",
    clear: "", // Will be handled specially to clear the terminal
    reboot: [
        "Restarting Icom V4.7...",
        "Rest̵̟͙͂͌a̵̟͒ŕ̴̛̲͜t̸̻̑ ̴̖̯̋f̶̻͛̄a̵̖͋̍i̸̲̳̚l̴̢͍͑ḛ̴̽̚d̵̰̾͗.",
        "I͏ ͢s͠a͝id ͘do͢n't ͝d̛o͟ t̸h͢a̸ţ."
    ],
    version: "Icom v4.7",
    status: "S̶y̵s̶t̷e̸m̴ ̷o̶p̴e̵r̷a̴t̸i̴o̶n̶a̸l̴... Er̸r͘o̶r͠: ̸E̷y̵e̴s̴ w̷a̸t̸c̴h̶i̸n̴g̷.",
    hidden: "Access denied",
    "read log.txt": "Log Entry 7: \nThey told me not to wake it... \nBut I had to know.\n\nLog Entry 8: \nIt's screams are haunting me.\nI can't sleep.\n\nLog Entry 9: \nI think it's watching me.\nI can feel its eyes on me.\n\nLog Entry 10: \nI must find a way to stop it.\nIt must not awaken. \n\nLog Entry 11: \nI have to warn others. \nBut who will believe me?\n\nLog Entry 12: \nI can hear it whispering.\nIt knows my name.\nIf I don't make it out alive...",
};
const commands = Object.keys(commandDict).map(key => `${key} - ${commandDict[key]}`);

// display messages one letter at a time in the terminal output
async function displayMessages(messages, extraClass = '') {
    // Convert to array if it's a string
    if (typeof messages === 'string') {
        messages = [messages];
    }

    terminalInput.disabled = true; // Disable input while typing
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const output = document.createElement('div');
        if(extraClass) output.classList.add(extraClass);
        terminalOutput.appendChild(output);
        for (let j = 0; j < message.length; j++) {
            output.textContent += message[j];
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 30));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    terminalInput.disabled = false;
    terminalInput.focus();
}



// Display the starting messages
displayMessages(startingMessacges);

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = terminalInput.value.trim();
        if (command) {
            const output = document.createElement('div');
            output.textContent = `$ ${command}`;
            terminalOutput.appendChild(output);
            terminalInput.value = '';

            setTimeout(() => {
                if (commandDict.hasOwnProperty(command)) {
                    if (command === 'clear') {
                        terminalOutput.innerHTML = '';
                        return;
                    }

                    // Special case: reboot disables input
                    if (command === 'reboot') {
                        displayMessages(commandDict[command], "glitch");
                        terminalInput.disabled = true;
                        return;
                    }

                    if (command === "status") {
                        displayMessages(commandDict[command], "glitch");
                        return;
                    }
                    

                    displayMessages(commandDict[command]);
                } else {
                    displayMessages(`Unknown command: ${command}`);
                }

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 500);
        }
    }
});