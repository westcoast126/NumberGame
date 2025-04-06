// --- DOM Elements ---
document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const attemptsSpan = document.getElementById('attempts');
    const playAgainButton = document.getElementById('play-again-button');
    const guessForm = document.getElementById('guess-form');

    // New Feedback Elements
    const feedbackZone = document.getElementById('feedback-zone');
    const feedbackGuessNumber = document.getElementById('feedback-guess-number');
    const feedbackText = document.getElementById('feedback-text');

    // --- Game State Variables ---
    let secretNumber;
    let attempts;
    let guessInputAnimationTimeout; // To manage shake animation timeout

    // --- Functions ---

    /**
     * Generates a random integer between 1 and 100 (inclusive).
     */
    function generateSecretNumber() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        console.log("Secret Number (for testing):", secretNumber); // Log for easier testing
    }

    /**
     * Updates the feedback display area with the guess result.
     * @param {string | number | null} guessValue - The number guessed or a symbol (e.g., '✅'). Null to hide.
     * @param {string} messageText - The message text (e.g., "TOO HIGH").
     * @param {string | null} type - The type of feedback ('high', 'low', 'correct', 'invalid') or null to clear.
     */
    function updateFeedback(guessValue, messageText, type) {
        // Clear previous state classes and content
        feedbackZone.classList.remove('high', 'low', 'correct', 'invalid', 'visible');
        feedbackGuessNumber.textContent = '';
        feedbackText.textContent = '';

        if (type) {
            // Set new content
            feedbackGuessNumber.textContent = guessValue;
            feedbackText.textContent = messageText;

            // Add appropriate class for styling
            feedbackZone.classList.add(type);

            // Make feedback visible with a slight delay to allow CSS transition
            // Use requestAnimationFrame for smoother rendering, especially for animations
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  feedbackZone.classList.add('visible');
                });
            });
        }
    }

    /**
     * Applies a shake animation to the input field.
     */
    function shakeInput() {
        // Clear any existing animation timeout
        clearTimeout(guessInputAnimationTimeout);
        guessInput.classList.add('shake');
        // Remove the class after the animation completes
        guessInputAnimationTimeout = setTimeout(() => {
            guessInput.classList.remove('shake');
        }, 500); // Duration should match CSS animation duration
    }

    /**
     * Handles the user's guess submission.
     * @param {Event} event - The form submission event.
     */
    function handleGuess(event) {
        event.preventDefault(); // Prevent default form submission

        const userGuess = parseInt(guessInput.value, 10);

        // --- Input Validation ---
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            updateFeedback(null, 'Enter 1-100', 'invalid');
            shakeInput(); // Add shake animation
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        // --- Process Valid Guess ---
        attempts++;
        attemptsSpan.textContent = attempts;

        if (userGuess === secretNumber) {
            // Correct Guess
            updateFeedback('✅', `Correct! ${attempts} attempts`, 'correct');
            guessInput.disabled = true;
            guessButton.disabled = true;
            playAgainButton.classList.add('visible'); // Show Play Again button via CSS class

        } else if (userGuess < secretNumber) {
            // Too Low
            updateFeedback(userGuess, 'Too low', 'low');
        } else {
            // Too High
            updateFeedback(userGuess, 'Too high', 'high');
        }

        guessInput.value = ''; // Clear input after guess
        guessInput.focus(); // Keep focus on input
    }

    /**
     * Resets the game state for a new round.
     */
    function resetGame() {
        attempts = 0;
        attemptsSpan.textContent = attempts;
        updateFeedback(null, '', null); // Clear feedback completely
        guessInput.disabled = false;
        guessButton.disabled = false;
        playAgainButton.classList.remove('visible'); // Hide Play Again button via CSS class
        guessInput.value = '';
        generateSecretNumber();
        guessInput.focus();
    }

    // --- Event Listeners ---
    guessForm.addEventListener('submit', handleGuess);
    playAgainButton.addEventListener('click', resetGame);

    // --- Initial Game Setup ---
    resetGame(); // Set up the first round
}); 