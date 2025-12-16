const keyboardDiv = document.querySelector('#keyboard-div');
const wordDiv = document.querySelector('#word-div');
const livesP = document.querySelector('#lives-p');

const keyboardLetters = [
    'qwertzuiop',
    'asdfghjkl',
    'yxcvbnm'
];

const testWords = [
    'apple',    'banana',     'cherry',     'dragon',    'elephant',
    'flower',   'guitar',     'honey',      'island',    'jungle',
    'kangaroo', 'lemon',      'mountain',   'notebook',  'ocean',
    'penguin',  'queen',      'rainbow',    'sunshine',  'tiger',
    'umbrella', 'violin',     'whale',      'xylophone', 'yogurt',
    'airplane', 'butterfly',  'candle',     'dolphin',   'eagle',
    'firework', 'galaxy',     'helicopter', 'igloo',     'jacket',
    'koala',    'lantern',    'microscope', 'nebula',    'octopus',
    'pyramid',  'quartz',     'robot',      'saxophone', 'tornado',
    'unicorn',  'volcano',    'waterfall',  'xenon',     'yacht',
    'avocado',  'blizzard',   'cactus',     'diamond',   'emerald',
    'falcon',   'glacier',    'hurricane',  'icicle',    'jigsaw',
    'kettle',   'lighthouse', 'mango',      'zeppelin',  'orchid',
    'pancake',  'quokka',     'raccoon',    'zebra',     'tulip',
    'urchin',   'vulture',    'walrus',     'xerox',     'yeti'
];

const maxLives = 5;

let remainingLetters = 'qwertzuiopasdfghjklyxcvbnm';
let remainigLives    = maxLives;
let solution;

document.addEventListener('keypress', (e) => handleInput(e.key));

function handleInput(letter) {
    if (!remainingLetters.includes(letter) || remainigLives < 1) return;

    remainingLetters = 
        remainingLetters.slice(0, remainingLetters.indexOf(letter)) + 
        remainingLetters.slice(remainingLetters.indexOf(letter) + 1, remainingLetters.length);

    document.querySelector(`span[letter=${letter}]`).classList.add('removed');
    checkLetter(letter);
}

async function generateWord() {
    let index = Math.floor(Math.random() * (testWords.length - 1));
    solution = testWords[index];

    displayWord();
}

function generateKeyboard() {
    keyboardLetters.forEach(letterLine => {
        let lineDiv = document.createElement('div');

        Array.from(letterLine).forEach(letter => {
            let letterSpan = document.createElement('span');
            
            letterSpan.textContent = letter;
            letterSpan.setAttribute('letter', letter);
            letterSpan.addEventListener('click', (e) => {
                e.preventDefault();
                handleInput(letter);
            });

            lineDiv.appendChild(letterSpan);
        });

        keyboardDiv.appendChild(lineDiv);
    });
}

function checkLetter(guessedLetter) {
    if (solution.includes(guessedLetter)) {
        updateWord(guessedLetter);
        return;
    }

    remainigLives--;

    keyboardDiv.classList.remove('wrong-letter');
    void keyboardDiv.offsetWidth;
    keyboardDiv.classList.add('wrong-letter');

    updateLives();
}

function updateWord(guessedLetter) {
    for (const [i, letter] of Array.from(solution).entries()) {
        if (letter == guessedLetter) updateLetter(i);
    }
}

function updateLetter(letterIndex) {
    let letterSpan = wordDiv.children[letterIndex];
    letterSpan.textContent = solution[letterIndex];
    letterSpan.classList.add('solved');
}

function displayWord() {
    for (const _ of solution) {
        let letterSpan = document.createElement('span');
        letterSpan.textContent = `\xa0`;
        wordDiv.appendChild(letterSpan);
    }
}

function disableKeyboard() {
    let activeKeys = [...keyboardDiv.querySelectorAll('span:not(.removed)')];
    activeKeys.sort(() => Math.random() - 0.5);

    for (const [i, key] of activeKeys.entries()) {
        setTimeout(() => key.classList.add('removed'), i * 10);
    }
}

function updateLives() {
    livesP.textContent = 'lives: ' + remainigLives + '/' + maxLives;

    if (remainigLives < 1) disableKeyboard();
}

updateLives();
generateWord();
generateKeyboard();