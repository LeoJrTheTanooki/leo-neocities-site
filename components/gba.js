// create an HTML template element
const template = document.createElement("template");

template.innerHTML = `
    
    <style>
      body {
        padding: 0;
      }

      .btn-depth {
        filter: drop-shadow(0px 7px 0 black);
      }

      .pressable:active {
        background-color: rgb(148, 163, 184);
        color: rgb(71, 85, 105);
      }

      .btn-fill {
        background-color: rgb(226, 232, 240);
        color: rgb(148, 163, 184);
      }

      .gba-fill {
        background-color: rgb(99, 102, 241);
        color: rgb(55, 48, 163);
      }

      .gba-wrapper {
        display: flex;
        width: 100%;
        min-width: 56rem;
        flex-direction: column;
        border-radius: 3rem;
        font-weight: 600;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        filter: drop-shadow(0rem 2.5rem 0 black);
      }

      .gba-header {
        display: flex;
        justify-content: space-between;
        border-top-left-radius: 9999px;
        border-top-right-radius: 9999px;
      }

      .shoulder-btn {
        height: 2.25rem;
        width: 8rem;
      }

      .shoulder-btn-left {
        border-bottom-right-radius: 9999px;
        border-top-left-radius: 9999px;
      }

      .shoulder-btn-right {
        border-bottom-left-radius: 9999px;
        border-top-right-radius: 9999px;
      }

      .logo-name {
        width: fit-content;
        border-radius: 9999px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        text-align: center;
        font-weight: 700;
        outline-style: solid;
      }

      .gba-footer {
        height: 4rem;
      }

      .gba-main {
        display: flex;
        justify-content: space-between;
      }

      .gba-left {
        display: flex;
        flex-direction: column;
        width: 10rem;
      }

      .gba-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 10rem;
      }

      .gba-tabs {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-weight: 400;
        color: rgb(0, 0, 0);
      }

      .gba-tab-btn {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        transform: translate(0, 0) rotate(12deg) skewX(0) skewY(0) scaleX(1)
          scaleY(1);
        cursor: pointer;
        border-radius: 0.5rem;
        border-width: 0;
        border-bottom-width: 4px;
        border-color: rgb(0, 0, 0);
        background-color: rgb(6, 182, 212);
        text-align: end;
        border-style: solid;
      }

      a.gba-tab-btn {
        text-decoration: none;
        color: #000;
      }

      a.gba-tab-btn:hover {
        margin-top: 4px;
        border-bottom-width: 0px;
        background-color: rgb(103, 232, 249);
      }

      .gba-dpad-align {
        margin-top: auto;
        display: flex;
        justify-content: center;
      }

      .gba-dpad-wrapper {
        display: grid;
        cursor: default;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        font-size: 1.5rem;
        line-height: 2rem;
      }

      .gba-dpad-slot {
        display: flex;
        height: 2rem;
        width: 2rem;
        align-items: center;
        justify-content: center;
      }


      .gba-start-wrapper {
        margin-right: 0.5rem;
        margin-top: 1.5rem;
        display: flex;
        cursor: default;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.75rem;
        padding-bottom: 1rem;
        font-weight: 600;
      }

      .gba-start-align {
        display: flex;
        width: 5rem;
        transform: translate(0, 0) rotate(12deg) skewX(0) skewY(0) scaleX(1)
          scaleY(1);
        align-items: center;
        justify-content: space-between;
        border-radius: 0.75rem;
        background-color: rgb(79, 70, 229);
        padding-left: 0.25rem;
      }

      .gba-start-btn {
        margin-left: 0.25rem;
        height: 1rem;
        width: 1rem;
        border-radius: 9999px;
        filter: drop-shadow(0px 3px 0 black);
      }

      .gba-screen-wrapper {
        border-radius: 1.5rem;
        border-width: 16px;
        border-style: solid;
        border-color: rgb(38, 38, 38);
        background-color: rgb(255, 255, 255);
        height: 65vh;
        position: relative;
        overflow: scroll;
        overscroll-behavior: none;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
        font-weight: 400;
        color: rgb(0, 0, 0);
      }

      .gba-brand-wrapper {
        margin-top: auto;
        width: 100%;
        cursor: default;
        background-color: rgb(38, 38, 38);
        padding-bottom: 16px;
        text-align: center;
        font-weight: 700;
        font-style: italic;
        color: rgb(255, 255, 255);
        text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
          2px 2px 0 #000;
        border-radius: 1.5rem /* 24px */;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
      }

      .advance-name {
        font-size: 0.75rem;
        line-height: 1rem;
        font-style: normal;
      }

      .gba-power-wrapper {
        margin-bottom: auto;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
      }

      slot {
        width: 100%;
      }

      .gba-power-light {
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 9999px;
        background-color: rgb(163, 230, 53);
      }

      .gba-ab-wrapper {
        display: flex;
        gap: 0.5rem;
        font-size: 1.875rem;
        line-height: 2.25rem;
      }

      .gba-ab-btns {
        height: 3rem;
        width: 3rem;
        cursor: default;
        border-radius: 9999px;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        font-weight: 600;
      }

      .gba-speaker-wrapper {
        margin-right: 1rem;
        margin-top: 1.5rem;
        display: flex;
        cursor: default;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        padding-bottom: 1rem;
        font-weight: 600;
      }

      .gba-speaker {
        height: 0.25rem;
        width: 5rem;
        transform: translate(0, 0) rotate(-12deg) skewX(0) skewY(0) scaleX(1)
          scaleY(1);
        border-radius: 0.75rem;
        background-color: rgb(0, 0, 0);
      }

      .prevent-select {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        cursor: default;
      }
    </style>

    <div class="gba-wrapper gba-fill">
      <nav class="gba-header">
        <div class="shoulder-btn shoulder-btn-left btn-fill pressable" id="btnL"></div>
        <div><p class="logo-name prevent-select">Ace's Blog</p></div>
        <div class="shoulder-btn shoulder-btn-right btn-fill pressable" id="btnR"></div>
      </nav>
      <div class="gba-main">
        <aside class="gba-left">
          <div class="gba-tabs" id="tabs">
            <a class="gba-tab-btn" href="/index.html"> Home </a>
            <a class="gba-tab-btn" href="/pages/about.html"> About </a>
            <a class="gba-tab-btn" href="/pages/graphicbazaar.html">
              Graphics
            </a>
            <a class="gba-tab-btn" href="/pages/gallery.html"> Gallery </a>
            <a class="gba-tab-btn" href="/pages/commissions.html">
              Commissions
            </a>
            <a class="gba-tab-btn" href="/pages/interests.html">
              Interests
            </a>
            <a class="gba-tab-btn" href="/pages/roster.html"> Roster </a>
          </div>
          <div class="gba-dpad-align">
            <div class="gba-dpad-wrapper">
              <div class="gba-dpad-slot"></div>
              <div class="gba-dpad-slot btn-fill pressable prevent-select" id="btnUp">🞁</div>
              <div class="gba-dpad-slot"></div>
              <div class="gba-dpad-slot btn-depth pressable btn-fill prevent-select" id="btnLeft">
                🞀
              </div>
              <div class="gba-dpad-slot btn-fill prevent-select">●</div>
              <div class="gba-dpad-slot btn-depth pressable btn-fill prevent-select" id="btnRight">
                🞂
              </div>
              <div class="gba-dpad-slot"></div>
              <div class="gba-dpad-slot btn-depth pressable btn-fill prevent-select" id="btnDown">
                🞃
              </div>
            </div>
          </div>
          <div class="gba-start-wrapper">
            <div class="gba-start-align prevent-select">
              START
              <div class="gba-start-btn btn-fill pressable" id="btnStart"></div>
            </div>
            <div class="gba-start-align prevent-select">
              SELECT
              <div class="gba-start-btn btn-fill pressable" id="btnSelect"></div>
            </div>
          </div>
        </aside>
        <div class="" style="height: 100%; width: 100%">
          <div class="gba-screen-wrapper"><slot> </slot></div>
          <div class="gba-brand-wrapper">
            GAME RACC <span class="advance-name prevent-select">ADVANCE</span>
          </div>
        </div>
        <aside class="gba-right">
          <div class="gba-power-wrapper">
            <div class="gba-power-light"></div>
            <span class="prevent-select">POWER</span>
          </div>
          <div class="gba-ab-wrapper">
            <div style="margin-top: 1rem" class="gba-ab-btns btn-fill pressable btn-depth prevent-select" id="btnB">B</div>
            <div class="gba-ab-btns btn-fill pressable btn-depth prevent-select" id="btnA">A</div>
          </div>
          <div class="gba-speaker-wrapper">
            <div class="gba-speaker"></div>
            <div class="gba-speaker"></div>
            <div class="gba-speaker"></div>
            <div class="gba-speaker"></div>
            <div class="gba-speaker"></div>
          </div>
        </aside>
      </div>
      <div class="gba-footer"></div>
    </div>

    `;

class Gba extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const btnUp = this.shadowRoot.getElementById("btnUp");
    const btnLeft = this.shadowRoot.getElementById("btnLeft");
    const btnRight = this.shadowRoot.getElementById("btnRight");
    const btnDown = this.shadowRoot.getElementById("btnDown");
    const btnA = this.shadowRoot.getElementById("btnA");
    const btnB = this.shadowRoot.getElementById("btnB");
    const btnL = this.shadowRoot.getElementById("btnL");
    const btnR = this.shadowRoot.getElementById("btnR");
    const btnStart = this.shadowRoot.getElementById("btnStart");
    const btnSelect = this.shadowRoot.getElementById("btnSelect");
    localStorage.setItem("test", !JSON.parse(localStorage.getItem("test")))
    let inputs = [];
    let konamiCode = ["n", "n", "s", "s", "w", "e", "w", "e", "b", "a", "st"];



    const inputPress = (inputVar) => {
      inputs.push(inputVar);
      if (inputs.length > 32) {
        inputs.shift();
      }
      if (
        JSON.stringify(inputs.toSpliced(0, inputs.length - 11)) ==
        JSON.stringify(konamiCode)
      ) {
        window.location.href = "/pages/healthtest.html";
      }

    };

    btnUp.addEventListener("click", () => {
      inputPress("n");
    });

    btnLeft.addEventListener("click", () => {
      inputPress("w");
    });

    btnRight.addEventListener("click", () => {
      inputPress("e");
    });

    btnDown.addEventListener("click", () => {
      inputPress("s");
    });

    btnA.addEventListener("click", () => {
      inputPress("a");
    });

    btnB.addEventListener("click", () => {
      inputPress("b");
    });

    btnL.addEventListener("click", () => {
      inputPress("l");
    });

    btnR.addEventListener("click", () => {
      inputPress("r");
    });

    btnStart.addEventListener("click", () => {
      inputPress("st");
    });

    btnSelect.addEventListener("click", () => {
      inputPress("se");
    });
  }
}
customElements.define("gba-component", Gba);
