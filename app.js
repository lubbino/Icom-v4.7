const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');


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
                result.textContent = `Executed: ${command}`;
                terminalOutput.appendChild(result);
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom
            }, 500);
        }
    }
});
