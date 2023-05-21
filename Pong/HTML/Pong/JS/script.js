// Elementi del DOM
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");

// Inizializzazione dei punteggi
let p1 = 0;
let p2 = 0;

// Posizione iniziale del paddle1 e del paddle2
let paddle1Y = 170;
let paddle2Y = 170;

// Posizione iniziale della pallina
let ballX = 295;
let ballY = 195;
let ballSpeedX = 2; // Velocità orizzontale della pallina
let ballSpeedY = 2; // Velocità verticale della pallina

// Funzione per muovere il paddle1
function movePaddle1(wKey, sKey) {
  document.addEventListener("keydown", function (event) {
    if (event.key === wKey && paddle1Y > 10) {
      paddle1Y -= 20; // Sposta il paddle1 verso l'alto
    } else if (event.key === sKey && paddle1Y < 330) {
      paddle1Y += 20; // Sposta il paddle1 verso il basso
    }
  });
}

// Funzione per muovere il paddle2
function movePaddle2(upArrow, downArrow) {
  document.addEventListener("keydown", function (event) {
    if (event.key === upArrow && paddle2Y > 10) {
      paddle2Y -= 20; // Sposta il paddle2 verso l'alto
    } else if (event.key === downArrow && paddle2Y < 330) {
      paddle2Y += 20; // Sposta il paddle2 verso il basso
    }
  });
}

// Funzione per animare la pallina e controllare le collisioni
function animate() {
  // Sposta il paddle1 e il paddle2 sulla base della posizione Y
  paddle1.style.top = paddle1Y + "px";
  paddle2.style.top = paddle2Y + "px";

  // Sposta la pallina
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Controllo collisione con i muri verticali
  if (ballY >= 390 || ballY <= 0) {
    ballSpeedY *= -1; // Cambia direzione verticale
  }

  // Controllo collisione con i muri laterali
  if (ballX <= 0) {
    p2++; // Incrementa il punteggio del giocatore 2
    score2.innerHTML = "Giocatore 2: " + p2; // Aggiorna il punteggio visualizzato per il giocatore 2
    resetBall();
  } else if (ballX >= 590) {
    p1++; // Incrementa il punteggio del giocatore 1
    score1.innerHTML = "Giocatore 1: " + p1; // Aggiorna il punteggio visualizzato per il giocatore 1
    resetBall();
  }

  // Controllo collisione con il paddle1
  if (ballX <= 20 && ballY + 10 >= paddle1Y && ballY <= paddle1Y + 60) {
    ballSpeedX *= -1; // Cambia direzione orizzontale
  }

  // Controllo collisione con il paddle2
  if (ballX >= 570 && ballY + 10 >= paddle2Y && ballY <= paddle2Y + 60) {
    ballSpeedX *= -1; // Cambia direzione orizzontale
  }

  // Non so cosa sia, ma a quanto pare richiama la funzione dell'animazione e senza questa parte il gioco non funziona
  requestAnimationFrame(animate);
}

// Funzione per reimpostare la posizione della pallina al centro
function resetBall() {
  ballX = 295;
  ballY = 195;
}

// Avvia l'animazione
animate();

// I paramentri di queste 2 funzioni sono i comandi per muovere i due paddle, 
// sono un po' scomodi per testare, perchè il gioco è pensato per 2 persone 

// Chiamata alla funzione per muovere il paddle1
movePaddle1("q", "a");
// Chiamata alla funzione per muovere il paddle2
movePaddle2("è", "à");
