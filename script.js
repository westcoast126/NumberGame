// --- DOM Elements ---
document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const message = document.getElementById('message');
    const attemptsSpan = document.getElementById('attempts');
    const playAgainButton = document.getElementById('play-again-button');
    const guessForm = document.getElementById('guess-form');

    // --- Game State Variables ---
    let secretNumber;
    let attempts;

    // --- Functions ---

    /**
     * Generates a random integer between 1 and 100 (inclusive).
     */
    function generateSecretNumber() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        console.log("Secret Number (for testing):", secretNumber); // Log for easier testing
    }

    /**
     * Updates the feedback message displayed to the user.
     * @param {string} msg - The message text.
     * @param {string} type - The type of message ('correct', 'error', or null for default).
     */
    function updateMessage(msg, type) {
        message.textContent = msg;
        message.className = ''; // Reset classes
        if (type === 'correct') {
            message.classList.add('correct');
        } else if (type === 'error') {
            message.classList.add('error');
        }
    }

    /**
     * Handles the user's guess submission.
     * @param {Event} event - The form submission event.
     */
    function handleGuess(event) {
        event.preventDefault(); // Prevent default form submission which reloads the page

        const userGuess = parseInt(guessInput.value, 10);

        // --- Input Validation ---
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            updateMessage('Please enter a valid number between 1 and 100.', 'error');
            guessInput.value = ''; // Clear invalid input
            guessInput.focus(); // Put cursor back in input
            return; // Stop processing this guess
        }

        // --- Process Valid Guess ---
        attempts++;
        attemptsSpan.textContent = attempts;

        if (userGuess === secretNumber) {
            // Correct Guess
            updateMessage(`Correct! You guessed it in ${attempts} attempts! 🎉`, 'correct');
            guessInput.disabled = true;
            guessButton.disabled = true;
            playAgainButton.style.display = 'inline-block'; // Show Play Again button
        } else if (userGuess < secretNumber) {
            // Too Low
            updateMessage('Too low! Try again.', 'error');
        } else {
            // Too High
            updateMessage('Too high! Try again.', 'error');
        }

        guessInput.value = ''; // Clear input after guess
        guessInput.focus(); // Keep focus on input for next guess
    }

    /**
     * Resets the game state for a new round.
     */
    function resetGame() {
        attempts = 0;
        attemptsSpan.textContent = attempts;
        updateMessage(''); // Clear feedback message
        guessInput.disabled = false;
        guessButton.disabled = false;
        playAgainButton.style.display = 'none'; // Hide Play Again button
        guessInput.value = ''; // Clear input field
        generateSecretNumber(); // Generate a new number
        guessInput.focus(); // Set focus back to input
    }

    // --- Event Listeners ---
    guessForm.addEventListener('submit', handleGuess);
    playAgainButton.addEventListener('click', resetGame);

    // --- Initial Game Setup ---
    resetGame(); // Call resetGame initially to set up the first round
}); 