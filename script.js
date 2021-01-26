const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;

      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createObstacle() {
  const obstacle = document.createElement("div");
  let obstaclePosition = 1600;
  let randomTime = Math.random() * 6000;

  obstacle.classList.add("obstacle");
  obstacle.style.left = 1600 + "px";
  background.appendChild(obstacle);

  let leftInterval = setInterval(() => {
    if (obstaclePosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(obstacle);
    } else if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
    } else {
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + "px";
    }
  }, 20);

  setTimeout(createObstacle, randomTime);
}

createObstacle();

document.addEventListener("keyup", handleKeyUp);
