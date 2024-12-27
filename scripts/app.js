const dataFetch = async () => {
  const promise = await fetch("/scripts/chars.json");
  const data = await promise.json();
  const charList = data.Characters;
  return charList;
};

const dataLoad = async () => {
  let charList = await dataFetch();
  charList.sort(() => Math.random() - 0.5);

  let partyMember = document.getElementsByClassName("partyMember");

  for (let i = 0; i < partyMember.length; i++) {
    let playerDiv = partyMember[i];

    let playerHealth = playerDiv.children[1];
    let playerCanvas = playerDiv.children[0].children[0];
    let playerName =
      playerHealth.children[0].children[0].children[0].children[0];
    let playerSpriteSheet = new Image();
    let playerCanvasCtx = playerCanvas.getContext("2d");

    let isHovering = false;
    playerHealth.addEventListener("mouseenter", (e) => {
      isHovering = true;
    });
    playerHealth.addEventListener("mouseleave", (e) => {
      isHovering = false;
    });

    playerName.textContent = charList[i].name;
    playerHealth.href = charList[i].link;
    let playerHpWheels =
      playerHealth.children[0].children[0].children[0].children[1].children[1]
        .children;
    let playerPpWheels =
      playerHealth.children[0].children[0].children[0].children[2].children[1]
        .children;
    let hpIdx = charList[i].hp.length;
    for (let j = playerHpWheels.length - 1; j >= 0; j--) {
      hpIdx--;
      playerHpWheels[j].textContent = charList[i].hp[hpIdx];
      if (charList[i].hp[hpIdx]) {
        playerHpWheels[j].classList.add("health-wheel");
        playerHpWheels[j].classList.remove("bg-white");
      }
    }
    let ppIdx = charList[i].pp.length;
    for (let j = playerPpWheels.length - 1; j >= 0; j--) {
      ppIdx--;
      playerPpWheels[j].textContent = charList[i].pp[ppIdx];
      if (charList[i].pp[ppIdx]) {
        playerPpWheels[j].classList.add("health-wheel");
        playerPpWheels[j].classList.remove("bg-white");
      }
    }

    playerSpriteSheet.src = await charList[i].spriteSheet;
    const drawFrame = (frameX, frameY, canvasX, canvasY) => {
      playerCanvasCtx.drawImage(
        playerSpriteSheet,
        frameX * width,
        frameY * height,
        width,
        height,
        canvasX,
        canvasY,
        scaledWidth,
        scaledHeight
      );
    };
    const width = 32;
    const height = 16;
    const scaledWidth = 32;
    const scaledHeight = 16;
    let newLoopCap = playerSpriteSheet.width / 32;
    let newLoop = newLoopCap;
    const step = () => {
      playerCanvasCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
      drawFrame(newLoop, 0, 0, 0);
      if (isHovering) {
        newLoop--;
        if (newLoop <= 0) {
          newLoop = 0;
        }
      } else {
        newLoop++;
        if (newLoop >= newLoopCap) {
          newLoop = newLoopCap;
        }
      }
      window.requestAnimationFrame(step);
    };
    playerSpriteSheet.onload = () => {
      window.requestAnimationFrame(step);
    };
  }
};

dataLoad();
