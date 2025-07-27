class Footer extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const dataFetch = async () => {
      const promise = await fetch("/scripts/m3party.json");
      const data = await promise.json();
      const m3Party = data.Characters;
      return m3Party;
    };

    let m3PartyCopy;

    // Variable made for debugging purposes
    let partyIdxEditor = document.getElementsByClassName("partyIdxEditor");

    for (let i = 0; i < partyIdxEditor.length; i++) {
      let m3Party = await dataFetch();
      partyIdxEditor[i].value = i;
      partyIdxEditor[i].addEventListener("change", (e) => {
        if (e.target.value >= m3Party.length) {
          e.target.value = 0;
        } else if (e.target.value < 0) {
          e.target.value = m3Party.length - 1;
        }
        m3PartyCopy[i] = m3Party[e.target.value];
        dataLoad();
      });
    }

    const dataLoad = async () => {
      let m3Party = await dataFetch();
      if (!m3PartyCopy) {
        m3PartyCopy = m3Party;
      }

      if (partyIdxEditor.length <= 0) {
        m3PartyCopy.sort(() => Math.random() - 0.5);
      }

      let partyMember = document.getElementsByClassName("partyMember");

      for (let i = 0; i < partyMember.length; i++) {
        
        let playerDiv = partyMember[i];

        // playerHealthInit is used to clear out previous eventListeners by replacing the element
        let playerHealthInit = playerDiv.children[1];
        let playerHealth = playerHealthInit.cloneNode(true)
        playerHealthInit.parentNode.replaceChild(playerHealth, playerHealthInit);

        // Establishing sprites
        let playerCanvas = playerDiv.children[0].children[0];
        let playerName =
          playerHealth.children[0].children[0].children[0].children[0];
        let playerCanvasCtx = playerCanvas.getContext("2d");

        let listName = m3PartyCopy[i].name;
        let listSpriteSheet = m3PartyCopy[i].spriteSheet;
        let listLink = m3PartyCopy[i].link;
        let listHp = m3PartyCopy[i].hp;
        let listPp = m3PartyCopy[i].pp;
        let listWarning = m3PartyCopy[i].warning;
        let listStatus = m3PartyCopy[i].status;

        let isHovering = false;
        playerHealth.addEventListener("mouseenter", (e) => {
          isHovering = true;
        });
        playerHealth.addEventListener("mouseleave", (e) => {
          isHovering = false;
        });

        if (Array.isArray(listName)) {
          listName = listName.sort(() => Math.random() - 0.5)[0];
        }
        if (Array.isArray(listSpriteSheet)) {
          listSpriteSheet = listSpriteSheet.sort(() => Math.random() - 0.5)[0];
        }

        playerName.textContent = listName;


        playerHealth.addEventListener("click", () => {
          if (listWarning) {
            if (confirm("WARNING:\n" + listWarning)) {
              window.open(listLink, "_blank");
            }
          } else {
            window.open(listLink, "_blank");
          }
        });


        playerHealth.title = listLink;
        let playerHpWheels =
          playerHealth.children[0].children[0].children[0].children[1]
            .children[1].children;
        let playerPpWheels =
          playerHealth.children[0].children[0].children[0].children[2]
            .children[1].children;
        let hpIdx = listHp.length;
        for (let j = playerHpWheels.length - 1; j >= 0; j--) {
          hpIdx--;
          playerHpWheels[j].textContent = listHp[hpIdx];
          if (listHp[hpIdx]) {
            playerHpWheels[j].classList.add("scroll-wheel-gradient");
            playerHpWheels[j].classList.remove("bg-white");
          }
        }
        let ppIdx = listPp.length;
        for (let j = playerPpWheels.length - 1; j >= 0; j--) {
          ppIdx--;
          playerPpWheels[j].textContent = listPp[ppIdx];
          if (listPp[ppIdx]) {
            playerPpWheels[j].classList.add("scroll-wheel-gradient");
            playerPpWheels[j].classList.remove("bg-white");
          }
        }

        const loadSheetParam = (src) => {
          return new Promise((resolve, reject) => {
            const playerSpriteSheet = new Image();
            playerSpriteSheet.onload = () => resolve(playerSpriteSheet);
            playerSpriteSheet.onerror = reject;
            playerSpriteSheet.src = src;
            let statusText;
            listStatus
              ? (statusText = ", with a " + listStatus + " status effect")
              : (statusText = "");
            playerSpriteSheet.alt =
              "Sprite of " +
              listName +
              " rising/dropping behind health container" +
              statusText;
          });
        };

        let spriteSrc = await listSpriteSheet;

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

    this.innerHTML = `
    <style>
      body {
        image-rendering: pixelated;
      }

      .footer-1 {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        position: sticky;
        margin-top: auto;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(to top, black 35%, transparent 35%);
      }

      .flex {
        display: flex;
      }

      .justify-center {
        justify-content: center;
      }

      .partyMember {
        align-content: flex-end;
      }

      .canvas-height {
        height: 64px;
      }

      .health-wrap {
        width: fit-content;
        font-size: 32px;
        line-height: 0.954em;
        cursor: pointer;
        font-family: AppleKid;
        font-size: 32px;
      }

      .health1 {
        border-radius: 0.4rem;
        border-width: 0.16rem;
        border-color: rgb(0, 0, 0);
        border-style: solid;
      }

      .health2 {
        display: flex;
        width: 7.4rem;
        flex-direction: column;
        border-radius: 0.4rem;
        border-width: 0.16em;
        border-color: rgb(255, 255, 255);
        background-color: rgb(224, 192, 160);
        scrollbar-width: none;
        background-image: url(/components/m3party/health-bg.png);
        background-size: 12px;
        image-rendering: pixelated;
        border-style: solid;
      }

      .party-member-name {
        margin-bottom: 3px;
        text-align: center;
        line-height: 1.25rem;
      }

      .points-wrap {
        margin-bottom: 2px;
        display: flex;
        justify-content: space-around;
        text-align: end;
        line-height: 12px;
      }

      .points-text {
        font-family: SMB3;
        font-size: 16px;
        color: rgb(255, 255, 255);
        text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
          2px 2px 0 #000;
        color: white;
      }

      .scroll-wheel-wrap {
        display: flex;
        height: 18px;
        text-align: center;
      }

      .scroll-wheel {
        min-width: 18px;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
        padding-left: 3px;
        font-family: BitCell;
      }

      .scroll-wheel-last {
        border-right-width: 0px;
      }

      .scroll-wheel-gradient {
        background-image: linear-gradient(to top, #e0c0a0, #fff, #e0c0a0);
      }

      @font-face {
        font-family: AppleKid;
        src: url("../assets/woff/Apple-Kid.woff2") format("woff2"),
          url("../assets/woff/Apple-Kid.woff") format("woff");
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: SMB3;
        src: url(/assets/woff/Super-Mario-Bros--3.woff);
      }

      @font-face {
        font-family: BitCell;
        src: url(/assets/woff/bitcell_memesbruh03.woff);
      }
    </style>
    <footer class="footer-1">
      <div class="flex">
        <div class="partyMember">
          <div class="flex justify-center">
            <canvas width="32" height="32" class="canvas-height"> </canvas>
          </div>
          <div class="playerHealth">
            <div class="health-wrap">
              <div class="health1">
                <div class="health2">
                  <div class="party-member-name">&nbsp;</div>
                  <div class="points-wrap">
                    <div class="points-text">h p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                  <div class="points-wrap">
                    <div class="points-text">p p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="partyMember">
          <div class="flex justify-center">
            <canvas width="32" height="32" class="canvas-height"> </canvas>
          </div>
          <div class="playerHealth">
            <div class="health-wrap">
              <div class="health1">
                <div
                  class="health2"
                >
                  <div class="party-member-name">&nbsp;</div>
                  <div class="points-wrap">
                    <div class="points-text">h p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                  <div class="points-wrap">
                    <div class="points-text">p p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="partyMember">
          <div class="flex justify-center">
            <canvas width="32" height="32" class="canvas-height"> </canvas>
          </div>
          <div class="playerHealth">
            <div class="health-wrap">
              <div class="health1">
                <div
                  class="health2"
                >
                  <div class="party-member-name">&nbsp;</div>
                  <div class="points-wrap">
                    <div class="points-text">h p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                  <div class="points-wrap">
                    <div class="points-text">p p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="partyMember">
          <div class="flex justify-center">
            <canvas width="32" height="32" class="canvas-height"> </canvas>
          </div>
          <div class="playerHealth">
            <div class="health-wrap">
              <div class="health1">
                <div
                  class="health2"
                >
                  <div class="party-member-name">&nbsp;</div>
                  <div class="points-wrap">
                    <div class="points-text">h p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                  <div class="points-wrap">
                    <div class="points-text">p p</div>
                    <div class="scroll-wheel-wrap">
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel scroll-wheel-last"></div>
                      <div class="scroll-wheel"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define("m3-party", Footer);
