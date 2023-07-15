const input = document.querySelector('.guess');
const btnReset = document.querySelector('.again');
const counter = document.querySelector('.score');
const message = document.querySelector('.message');
const btnCheck = document.querySelector('.check');
const guessesNumberBlock = document.querySelector('.number');
const highscore = document.querySelector('.highscore')

let guessNumber = '';
let userGuesses = 0;
let highNum = highscore.textContent; // 6
let tryes = 0; // 10 

btnReset.addEventListener('click' , () => {
    message.innerHTML = 'Начните угадывать...'
    guessNumber = '';
    input.value = '';
    userGuesses = 0;
    document.body.style.backgroundColor = '#36393E';
    guessesNumberBlock.innerHTML = '?';
    guessNumber = Math.floor(Math.random() * 100);
    counter.textContent = 10
    btnCheck.style.opacity = '1';
    btnCheck.removeAttribute('disabled');
    console.log(guessNumber);
})

function gameOver() {
    printMessage('Вы проиграли! :(')
    btnCheck.setAttribute('disabled', true);
    btnCheck.style.opacity = '0.5';
    document.body.style.backgroundColor = '#f30000d8'
    return;
}

function gameWin(){
    printMessage('Вы угадали число!');
    guessesNumberBlock.innerHTML = guessNumber;
    document.body.style.backgroundColor = '#60b347';
    btnCheck.setAttribute('disabled', true);
    btnCheck.style.opacity = '0.5';
    return;
}

function randomNumber() {
  guessNumber = Math.floor(Math.random() * 100);
  console.log(guessNumber);
}

function printMessage(messageText) {
  message.innerHTML = messageText;
}

function errorMessage(text) {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('erorMessage');
  input.after(errorMessage);
  errorMessage.innerHTML = text;
  btnCheck.setAttribute('disabled', true);
  btnCheck.style.opacity = '0.5';
  setTimeout(() => {
    errorMessage.remove();
    btnCheck.removeAttribute('disabled');
    btnCheck.style.opacity = '1';
  }, 3000);
}

btnCheck.addEventListener('click', event => {
  userGuesses = Number(input.value);
  if (userGuesses === 0) {
    errorMessage('Введите только число!');
    return;
  }
  if (userGuesses > 100 || userGuesses < 0){
    errorMessage('Введите число не меньше чем 0 и не больше чем 100!');
    return;
  }
  if (userGuesses < guessNumber) {
    tryes = Number(counter.textContent) - 1;
    printMessage('Мало...');
    counter.innerHTML = tryes
    if (tryes === 0){
        gameOver()
    } 
    if (tryes !== 0){
        setTimeout(() => {
            printMessage('Начните угадывать...');
        },1000)
    }
    
    
  }
  if (userGuesses > guessNumber) {
    printMessage('Много...');
    
    tryes = Number(counter.textContent) - 1;
    counter.innerHTML = tryes
    if (tryes === 0){
        gameOver()
       
    }
    if (tryes !== 0){
        setTimeout(() => {
            printMessage('Начните угадывать...');
        },1000)
    }
  }
  if (userGuesses === guessNumber) {
    gameWin()
     // 3 
    if ( highNum < tryes){
        highscore.innerHTML = 10 - Number(tryes);
    } 
  }
});

randomNumber();
