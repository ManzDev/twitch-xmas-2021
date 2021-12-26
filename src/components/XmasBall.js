const DURATION = 8000;
const DELAY = 1500;

class XmasBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .ball {
        width: 50px;
        height: 50px;
        border: 3px solid var(--color-back);
        border-radius: 50%;

        --color-1: #fff3;
        --color-2: #fff6;
        background: linear-gradient(135deg, var(--color-1) 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, var(--color-2) 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, var(--color-1) 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, var(--color-2) 25%, var(--color-back) 25%) 0px 0/ 20px 20px;
        background-color: var(--color-back);
        transition: box-shadow 1.5s ease-in-out;
      }

      .image {
        background-size: cover;
        background-position: center;
      }

      .on {
        box-shadow: 0 0 10px 5px var(--color-back);
      }
    `;
  }

  setAvatar(name, image) {
    this.name = name;
    const ball = this.shadowRoot.querySelector(".ball:not(.image)");
    ball.style.backgroundImage = `url(${image})`;
    ball.classList.add("image");
    this.turnOn();
  }

  turnOn() {
    const ball = this.shadowRoot.querySelector(".ball");
    ball.classList.add("on");
    setTimeout(() => this.turnOff(), DURATION);
  }

  turnOff() {
    const ball = this.shadowRoot.querySelector(".ball");
    ball.classList.remove("on");
    ball.style.backgroundSize = "cover";
    ball.style.backgroundPosition = "center";
    setTimeout(() => this.disappear(), DELAY);

    const event = new CustomEvent("DEL_USER", {
      detail: { name: this.name },
      composed: true
    });
    this.dispatchEvent(event);
  }

  disappear() {
    const ball = this.shadowRoot.querySelector(".ball");
    ball.classList.remove("image");
    ball.style.backgroundImage = "";
    ball.style.backgroundSize = "";
    ball.style.backgroundPosition = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${XmasBall.styles}</style>
    <div class="ball model-1">
    </div>`;
  }
}

customElements.define("xmas-ball", XmasBall);
