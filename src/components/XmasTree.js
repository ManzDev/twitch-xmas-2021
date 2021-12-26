import "./XmasBall.js";

class XmasTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.totalBalls = 17;
    this.users = [];
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 600px;
        --height: 700px;
      }

      .container {
        width: var(--width);
        height: var(--height);

        display: grid;
        justify-items: center;
        align-content: center;
        position: relative;
      }

      .tree {
        display: grid;
        justify-items: center;
        align-content: center;
        position: absolute;
        bottom: 0;
      }

      .log {
        --size: calc(0.20 * var(--width));

        width: var(--size);
        height: var(--size);
        background: #633214;
        border-radius: 5px;
        transform: translateY(-15%);
        overflow: hidden;
        position: relative;
      }

      .log::before {
        content: "";
        display: block;
        width: 50%;
        height: 100%;
        background: #9F4F2A;
      }

      .log::after {
        content: "";
        display: block;
        background: #0005;
        width: 100%;
        height: 30%;
        position: absolute;
        top: 0;
      }

      .leaves {
        --leaves-width: calc(1 * var(--width));
        --leaves-height: calc(0.7 * var(--height));
        --mask-leaves: conic-gradient(
          transparent 0 135deg,
          #000 135deg 225deg,
          transparent 225deg
        );

        width: var(--leaves-width);
        height: var(--leaves-height);
        border-radius: 80% / 30%;
        background-color: #488400;
        -webkit-mask-image: var(--mask-leaves);
        z-index: 5;
      }

      .leaves.large {
        --offset: -14%;
        --offset-radius: 40% / 15%;
      }

      .leaves.medium {
        --leaves-width: calc(1 * var(--width));
        --leaves-height: calc(0.70 * var(--height));
        --offset: -25%;
        --offset-radius: 40%;
        z-index: 6;
        background-color: #5E9601;
        transform: translateY(80%) scale(0.85);
      }

      .leaves.small {
        --leaves-width: calc(1 * var(--width));
        --leaves-height: calc(0.70 * var(--height));
        z-index: 7;
        background-color: #74A700;
        transform: translateY(160%) scale(0.75);
      }

      .leaves::before {
        content: "";
        display: block;
        width: 50%;
        height: 100%;
        background: #fff2;
      }

      .leaves.medium::after,
      .leaves.large::after {
        content: "";
        display: block;
        background: #0003;
        width: 100%;
        height: 100%;
        transform: translateY(var(--offset));
        position: absolute;
        top: 0;
        border-radius: var(--offset-radius);
      }

      .star-container {
        width: 85px;
        height: 85px;
        position: absolute;
        top: 0;
        transform: translateY(75%);
        filter: drop-shadow(0 0 15px gold);
      }

      .star {
        width: 100%;
        height: 100%;
        background: yellow;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      }

      .background-card {
        background: linear-gradient(to top, #000, #004);
        width: 300px;
        height: 600px;
      }

      .balls-container {
        width: 300px;
        height: 400px;
        position: absolute;
        top: 27%;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .balls-group {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
        justify-center: center;
      }

      .balls-group:nth-child(3) {
        width: 140%;
        transform: translate(-12.5%, -10%);
        grid-template-columns: repeat(7, 1fr);
      }

      /* Balls pattern */
      xmas-ball:nth-child(3n+1) { --color-back: #a00; }
      xmas-ball:nth-child(3n+2) { --color-back: #00a; }
      xmas-ball:nth-child(3n+3) { --color-back: #aa0; }
    `;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("DEL_USER", ev => this.delUser(ev.detail.name));
  }

  setRandomBall(user, image) {
    if (this.users.includes(user)) { return; }
    this.addUser(user);

    const num = Math.floor(Math.random() * this.totalBalls);
    this.setBall(num, user, image);
  }

  addUser(user) {
    this.users.push(user);
  }

  delUser(user) {
    this.users = this.users.filter(u => u !== user);
  }

  setBall(num, user, image) {
    if (num > this.totalBalls) { return; }

    const balls = this.shadowRoot.querySelectorAll("xmas-ball");
    const specificBall = balls[num];
    specificBall.setAvatar(user, image);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${XmasTree.styles}</style>
    <div class="container">
      <div class="star-container">
        <div class="star"></div>
      </div>
      <div class="tree">
        <div class="leaves small"></div>
        <div class="leaves medium"></div>
        <div class="leaves large"></div>
        <div class="log"></div>
      </div>
      <div class="background-card"></div>
      <div class="balls-container">
        <div class="balls-group">
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
        </div>
        <div class="balls-group">
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
        </div>
        <div class="balls-group">
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
          <xmas-ball></xmas-ball>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("xmas-tree", XmasTree);
