// Initialize scores
let userScore = 0;
let computerScore = 0;
let isGameActive = true; // Flag to prevent multiple rapid clicks

// Get DOM elements
const userScoreSpan = document.getElementById('result');
const computerScoreSpan = document.getElementById('computerScore');
const resultMessage = document.querySelector('.msgcontainer p');
const choices = document.querySelectorAll('.choice');

// Function to get computer's random choice
const getComputerChoice = () => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

// Function to determine the winner
const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 'draw';
    } else if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Paper' && computerChoice === 'Rock') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
};

// Function to display the result message
const displayResult = (winner, userChoice, computerChoice) => {
    let message = `You chose ${userChoice}. Computer chose ${computerChoice}. `;
    if (winner === 'user') {
        message += 'You Win!';
        resultMessage.style.color = 'green';
    } else if (winner === 'computer') {
        message += 'You Lose!';
        resultMessage.style.color = 'red';
    } else {
        message += "It's a Draw!";
        resultMessage.style.color = '#4E6766';
    }
    resultMessage.textContent = message;
};

// Function to update scores
const updateScores = (winner) => {
    if (winner === 'user') {
        userScore++;
        userScoreSpan.textContent = userScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
    }
    // For draw, no score update
};

// Main game function
const playGame = (userChoice) => {
    if (!isGameActive) return; // Prevent multiple clicks
    isGameActive = false;

    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);
    displayResult(winner, userChoice, computerChoice);
    updateScores(winner);

    // Re-enable after a short delay for smooth UX
    setTimeout(() => {
        isGameActive = true;
    }, 500);
};

// Add event listeners to choices
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});

// Reset game function
const resetGame = () => {
    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    resultMessage.textContent = 'Play your move!!';
    resultMessage.style.color = '#4E6766';
};

// Add event listener to reset button
document.getElementById('reset-btn').addEventListener('click', resetGame);

