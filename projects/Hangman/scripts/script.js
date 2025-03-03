document.addEventListener('DOMContentLoaded', function () {
    // Game elements
    const wordDisplay = document.getElementById('wordDisplay');
    const hintText = document.querySelector('.hint span');
    const incorrectGuessesElement = document.getElementById('incorrectGuesses');
    const messageElement = document.getElementById('message');
    const keyboardElement = document.getElementById('keyboard');
    const newGameBtn = document.getElementById('newGameBtn');
    const categoryBtn = document.getElementById('categoryBtn');
    const hangmanParts = document.querySelectorAll('.hangman-part.hidden');

    // Game variables
    let currentWord = '';
    let currentHint = '';
    let guessedLetters = [];
    let incorrectGuesses = 0;
    let maxIncorrectGuesses = 6;
    let gameOver = false;
    let currentCategory = 'movies';

    // Word categories
    const categories = {
        movies: [
            { word: 'inception', hint: 'Dream within a dream sci-fi film' },
            { word: 'avatar', hint: 'Blue aliens on a lush moon called Pandora' },
            { word: 'jaws', hint: 'Famous shark thriller by Steven Spielberg' },
            { word: 'titanic', hint: 'Romantic disaster film about a sinking ship' },
            { word: 'godfather', hint: 'Classic mafia family drama' }
        ],
        technology: [
            { word: 'javascript', hint: 'Popular web programming language' },
            { word: 'blockchain', hint: 'Technology behind cryptocurrencies' },
            { word: 'artificial', hint: 'The "AI" in AI technology' },
            { word: 'metaverse', hint: 'Virtual shared space concept' },
            { word: 'quantum', hint: 'Computing that uses quantum mechanics' }
        ],
        sports: [
            { word: 'basketball', hint: 'Sport played with a hoop and ball' },
            { word: 'tennis', hint: 'Sport played with rackets and a court' },
            { word: 'soccer', hint: 'The most popular sport in the world' },
            { word: 'volleyball', hint: 'Sport played over a net with a team' },
            { word: 'cricket', hint: 'Sport with wickets, bats, and bowlers' }
        ]
    };

    // Set up the keyboard
    function setupKeyboard() {
        keyboardElement.innerHTML = '';
        for (let i = 97; i <= 122; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.classList.add('key');
            button.setAttribute('data-key', letter);
            button.addEventListener('click', () => handleGuess(letter));
            keyboardElement.appendChild(button);
        }
    }

    // Initialize the game
    function initGame() {
        // Reset game
        incorrectGuesses = 0;
        guessedLetters = [];
        gameOver = false;

        // Reset UI elements
        incorrectGuessesElement.textContent = '0';
        messageElement.textContent = '';
        messageElement.className = 'message';

        // Reset hangman figure
        hangmanParts.forEach(part => part.classList.add('hidden'));

        // Get a random word from the current category
        const wordList = categories[currentCategory];
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const wordData = wordList[randomIndex];

        currentWord = wordData.word.toLowerCase();
        currentHint = wordData.hint;

        // Set the hint
        hintText.textContent = currentHint;

        // Display blank spaces for the word
        displayWord();

        // Reset keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('disabled', 'correct', 'incorrect');
        });
    }

    // Display the word with guessed letters shown and unguessed letters as blanks
    function displayWord() {
        wordDisplay.innerHTML = '';

        currentWord.split('').forEach(char => {
            const letterElement = document.createElement('div');
            letterElement.classList.add('letter');

            if (guessedLetters.includes(char) || !char.match(/[a-z]/i)) {
                letterElement.textContent = char;
            }

            wordDisplay.appendChild(letterElement);
        });

        // Check if the player has won
        const correctGuesses = currentWord.split('').filter(char =>
            guessedLetters.includes(char) || !char.match(/[a-z]/i)
        ).length;

        if (correctGuesses === currentWord.length && !gameOver) {
            gameOver = true;
            messageElement.textContent = 'Congratulations! You won!';
            messageElement.classList.add('success');
        }
    }

    // Handle letter guess
    function handleGuess(letter) {
        if (gameOver || guessedLetters.includes(letter)) {
            return;
        }

        guessedLetters.push(letter);

        // Update keyboard
        const key = document.querySelector(`[data-key="${letter}"]`);
        key.classList.add('disabled');

        if (currentWord.includes(letter)) {
            // Correct guess
            key.classList.add('correct');
            displayWord();
        } else {
            // Incorrect guess
            key.classList.add('incorrect');
            incorrectGuesses++;
            incorrectGuessesElement.textContent = incorrectGuesses;

            // Show hangman part
            if (incorrectGuesses <= maxIncorrectGuesses) {
                hangmanParts[incorrectGuesses - 1].classList.remove('hidden');
            }

            // Check if the player has lost
            if (incorrectGuesses >= maxIncorrectGuesses) {
                gameOver = true;
                messageElement.textContent = `Game over! The word was "${currentWord}".`;
                messageElement.classList.add('error');
            }
        }
    }

    // Handle keyboard input
    document.addEventListener('keydown', function (event) {
        if (gameOver) return;

        const key = event.key.toLowerCase();
        if (key.match(/^[a-z]$/) && !guessedLetters.includes(key)) {
            handleGuess(key);
        }
    });

    // Change category
    function changeCategory() {
        const categories = ['movies', 'technology', 'sports'];
        const currentIndex = categories.indexOf(currentCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        currentCategory = categories[nextIndex];

        messageElement.textContent = `Category changed to: ${currentCategory}`;
        messageElement.className = 'message';

        initGame();
    }

    // Set up event listeners
    newGameBtn.addEventListener('click', initGame);
    categoryBtn.addEventListener('click', changeCategory);

    // Initialize the keyboard and the game
    setupKeyboard();
    initGame();
});

// added for navbar functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add shadow and change background opacity on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});