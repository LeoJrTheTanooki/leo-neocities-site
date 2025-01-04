const dataFetch = async () => {
  const promise = await fetch("/scripts/chars.json");
  const data = await promise.json();
  const charList = data.Characters;
  return charList;
};

let charListCopy

let partyIdxEditor = document.getElementsByClassName("partyIdxEditor");

for (let i = 0; i < partyIdxEditor.length; i++) {
  let charList = await dataFetch();
  partyIdxEditor[i].value = i 
  partyIdxEditor[i].addEventListener("change", (e) => {
    if (e.target.value >= charList.length) {
      e.target.value = 0;
    } else if (e.target.value < 0) {
      e.target.value = charList.length - 1;
    }
    charListCopy[i] = charList[e.target.value];
    dataLoad();
  })
}

const dataLoad = async () => {
  let charList = await dataFetch();
  if(!charListCopy){
    charListCopy = charList;
  }

  if (partyIdxEditor.length <= 0) {
    charListCopy.sort(() => Math.random() - 0.5);
  } 

  let partyMember = document.getElementsByClassName("partyMember");

  for (let i = 0; i < partyMember.length; i++) {
    let playerDiv = partyMember[i];

    let playerHealth = playerDiv.children[1];
    let playerCanvas = playerDiv.children[0].children[0];
    let playerName =
      playerHealth.children[0].children[0].children[0].children[0];
    let playerCanvasCtx = playerCanvas.getContext("2d");

    let isHovering = false;
    playerHealth.addEventListener("mouseenter", (e) => {
      isHovering = true;
    });
    playerHealth.addEventListener("mouseleave", (e) => {
      isHovering = false;
    });

    playerName.textContent = charListCopy[i].name;

    playerHealth.addEventListener("click", (e) => {
      if (charListCopy[i].warning) {
        if (confirm("WARNING:\n" + charListCopy[i].warning)) {
          window.open(charListCopy[i].link, "_blank");
        }
      } else {
        window.open(charListCopy[i].link, "_blank");
      }
    });
    playerHealth.title = charListCopy[i].link;
    let playerHpWheels =
      playerHealth.children[0].children[0].children[0].children[1].children[1]
        .children;
    let playerPpWheels =
      playerHealth.children[0].children[0].children[0].children[2].children[1]
        .children;
    let hpIdx = charListCopy[i].hp.length;
    for (let j = playerHpWheels.length - 1; j >= 0; j--) {
      hpIdx--;
      playerHpWheels[j].textContent = charListCopy[i].hp[hpIdx];
      if (charListCopy[i].hp[hpIdx]) {
        playerHpWheels[j].classList.add("health-wheel");
        playerHpWheels[j].classList.remove("bg-white");
      }
    }
    let ppIdx = charListCopy[i].pp.length;
    for (let j = playerPpWheels.length - 1; j >= 0; j--) {
      ppIdx--;
      playerPpWheels[j].textContent = charListCopy[i].pp[ppIdx];
      if (charListCopy[i].pp[ppIdx]) {
        playerPpWheels[j].classList.add("health-wheel");
        playerPpWheels[j].classList.remove("bg-white");
      }
    }

    const loadSheetParam = (src) => {
      return new Promise((resolve, reject) => {
        const playerSpriteSheet = new Image();
        playerSpriteSheet.onload = () => resolve(playerSpriteSheet);
        playerSpriteSheet.onerror = reject;
        playerSpriteSheet.src = src;
        playerSpriteSheet.alt = `Sprite of ${
          charListCopy[i].name
        } rising/dropping behind health container${
          charListCopy[i].status
            ? ", with a " + charListCopy[i].status + " status effect"
            : ""
        }`;
      });
    };

    let spriteSrc = await charListCopy[i].spriteSheet;

    loadSheetParam(spriteSrc).then((spriteSheet) => {
      const width = 32;
      const height = 32;
      const scaledWidth = 32;
      const scaledHeight = 32;
      let newLoopCap = spriteSheet.width / 32;
      let newLoop = newLoopCap;
      const drawFrame = (frameX, frameY, canvasX, canvasY) => {
        playerCanvasCtx.drawImage(
          spriteSheet,
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
      const step = () => {
        playerCanvasCtx.clearRect(
          0,
          0,
          playerCanvas.width,
          playerCanvas.height
        );
        drawFrame(newLoop, 0, 0, 0);
        if (isHovering || window.screen.width < 1024) {
          newLoop--;
          if (newLoop <= 0) {
            newLoop = 0;
          }
        } else {
          newLoop++;
          if (newLoop >= newLoopCap) {
            newLoop = newLoopCap - 1;
          }
        }
        window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    });
  }
};

dataLoad();
