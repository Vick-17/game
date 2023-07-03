document.addEventListener("DOMContentLoaded", function () {
  const player = document.getElementById("player");
  const gameArea = document.getElementById("gameArea");
  const gameAreaRect = gameArea.getBoundingClientRect();

  let xPosition = 0;
  let yPosition = 0;
  let frame = 0;
  let animationInterval;
  let isAnimating = false;

  const movementSpeed = 5;
  const jumpForce = 12;
  let isJumping = false;
  let jumpVelocity = 0;
  const gravity = 0.6;

  function update() {
    if (xPosition < 0) {
      xPosition = 0;
    } else if (xPosition > gameAreaRect.width - player.offsetWidth) {
      xPosition = gameAreaRect.width - player.offsetWidth;
    }

    if (yPosition < 0) {
      yPosition = 0;
    } else if (yPosition > gameAreaRect.height - player.offsetHeight) {
      yPosition = gameAreaRect.height - player.offsetHeight;
    }

    player.style.left = xPosition + "px";
    player.style.top = yPosition + "px";

    requestAnimationFrame(update);
  }

  update();

  const keyState = {};

  document.addEventListener("keydown", function (event) {
    keyState[event.key] = true;

    if (event.key === "ArrowLeft" && keyState["ArrowUp"]) {
      startJump();
    } else if (event.key === "ArrowRight" && keyState["ArrowUp"]) {
      startJump();
    } else if (event.key === "ArrowLeft") {
      xPosition -= movementSpeed;
      startAnimation();
    } else if (event.key === "ArrowRight") {
      xPosition += movementSpeed;
      startAnimation();
    } else if (event.key === "ArrowUp") {
      startJump();
    }

    updateSpriteFrame();
  });

  document.addEventListener("keyup", function (event) {
    keyState[event.key] = false;

    if (!keyState["ArrowLeft"] && !keyState["ArrowRight"]) {
      stopAnimation();
    }
  });

  function startJump() {
    if (!isJumping) {
      isJumping = true;
      jumpVelocity = jumpForce;
      jump();
    }
  }

  function jump() {
    if (isJumping) {
      yPosition -= jumpVelocity;
      jumpVelocity -= gravity;

      if (yPosition >= gameAreaRect.height - player.offsetHeight) {
        yPosition = gameAreaRect.height - player.offsetHeight;
        isJumping = false;
        jumpVelocity = 0;
      } else {
        requestAnimationFrame(jump);
      }
    }
  }

  function startAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      animateSprite();
    }
  }

  function stopAnimation() {
    clearTimeout(animationInterval);
    isAnimating = false;
    player.style.backgroundImage = "";
  }

  function animateSprite() {
    frame = (frame + 1) % 6;
    player.style.backgroundImage = `url(./img/WalkToRight/${frame + 1}.png)`;

    animationInterval = setTimeout(animateSprite, 90);
  }

  function updateSpriteFrame() {
    // ...
  }
});
