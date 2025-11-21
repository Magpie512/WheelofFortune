//One human User vs 2 computer players
//Game features: Spin the wheel, Buy a vowel, Solve the puzzle, Skip turn

//Game state variables
let players = [
    { name: "Player 1", score: 0, isHuman: true },
    { name: "Computer 1", score: 0, isHuman: false },
    { name: "Computer 2", score: 0, isHuman: false }
];
let currentPlayerIndex = 0;
let wheelSectors = [100, 200, 300, 400, 500, 'Bankrupt', 'Lose a Turn'];
let isSpinning = false;
let currentPuzzle = "EXAMPLE PUZZLE";
let revealedLetters = [];
// Function to spin the wheel
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    let spinDuration = Math.random() * 3000 + 2000; // Spin for 2-5 seconds
    let start = Date.now();
    let spinInterval = setInterval(() => {
        let elapsed = Date.now() - start;
        if (elapsed >= spinDuration) {
            clearInterval(spinInterval);
            let sectorIndex = Math.floor(Math.random() * wheelSectors.length);
            handleWheelResult(wheelSectors[sectorIndex]);
            isSpinning = false;
        } else {
            //Update wheel visual here
        }
    }, 100);
}
// Function to handle wheel result
function handleWheelResult(result) {
    let currentPlayer = players[currentPlayerIndex];
    if (result === 'Bankrupt') {
        currentPlayer.score = 0;
        alert(`${currentPlayer.name} went Bankrupt!`);
    } else if (result === 'Lose a Turn') {
        alert(`${currentPlayer.name} lost their turn!`);
    } else {
        alert(`${currentPlayer.name} landed on $${result}!`);
        // Allow player to guess a consonant
        if (currentPlayer.isHuman) {
            let consonant = prompt("Guess a consonant:").toUpperCase();
            if (currentPuzzle.includes(consonant) && !revealedLetters.includes(consonant)) {
                revealedLetters.push(consonant);
                let occurrences = currentPuzzle.split(consonant).length - 1;
                currentPlayer.score += occurrences * result;
                alert(`Correct! ${consonant} appears ${occurrences} times.`);
            }
        } else {
            // Simple AI for computer players
            let consonants = "BCDFGHJKLMNPQRSTVWXYZ".split('').filter(c => currentPuzzle.includes(c) && !revealedLetters.includes(c));
            if (consonants.length > 0) {
                let consonant = consonants[Math.floor(Math.random() * consonants.length)];
                revealedLetters.push(consonant);
                let occurrences = currentPuzzle.split(consonant).length - 1;
                currentPlayer.score += occurrences * result;
                alert(`${currentPlayer.name} guessed ${consonant}. It appears ${occurrences} times.`);
            }
        }
    }
    updateStatusBar();
    nextPlayer();
}
// Function to update status bar
function updateStatusBar() {
    let statusBar = document.querySelector('.status-bar p');
    statusBar.textContent = players.map(p => `${p.name}: $${p.score}`).join(' | ');
}
// Function to move to the next player
function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    alert(`It's now ${players[currentPlayerIndex].name}'s turn!`);
}
// Event listeners for buttons
document.getElementById('Spin').add
EventListener('click', spinWheel);
document.getElementById('Solve').addEventListener('click', () => {
    let currentPlayer = players[currentPlayerIndex];
    let solution = prompt("Enter your solution:").toUpperCase();
    if (solution === currentPuzzle) {
        alert(`${currentPlayer.name} solved the puzzle!`);
        // End game or reset puzzle
    } else {
        alert("Incorrect solution.");
        nextPlayer();
    }
});
document.getElementById('BuyVowel').addEventListener('click', () => {
    let currentPlayer = players[currentPlayerIndex];
    if (currentPlayer.score >= 250) {
        let vowel = prompt("Enter a vowel:").toUpperCase();
        if ("AEIOU".includes(vowel) && currentPuzzle.includes(vowel) && !revealedLetters.includes(vowel)) {
            revealedLetters.push(vowel);
            let occurrences = currentPuzzle.split(vowel).length - 1;
            alert(`Correct! ${vowel} appears ${occurrences} times.`);
            currentPlayer.score -= 250;
            updateStatusBar();
        } else {
            alert("Incorrect vowel or already revealed.");
        }
    } else {
        alert("Not enough money to buy a vowel.");
    }
});
document.getElementById('SkipTurn').addEventListener('click', () => {
    alert(`${players[currentPlayerIndex].name} skipped their turn.`);
    nextPlayer();
});
// Initial status bar update
updateStatusBar();

// Initial alert to start the game
alert(`Welcome to Wheel of Fortune! It's ${players[currentPlayerIndex].name}'s turn!`);

// Puzzle list
fetch('puzzles.txt')
    .then(response => response.text())
    .then(data => {
        let puzzles = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)].toUpperCase();
        loadNewPuzzle();
    }
    
);

