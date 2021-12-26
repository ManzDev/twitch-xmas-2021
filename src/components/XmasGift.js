const CHARACTERS = [
  "avocado.svg",
  "spherical-cow.svg",
  "manzdev.svg",
  "dorito.svg",
  "controller.svg",
  "glados.svg",
  "parkour.svg",
  "scientific-avocado.svg"
];

class XmasGift extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.image = "avocado.svg";
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 100px;
        --height: 100px;
        --ribbon-color: #1D6468;
        position: relative;
        transform: translate(var(--offset-x), 0);
        z-index: 25;
      }

      .gift {
        --ribbon-gradient:
          linear-gradient(to right,
            transparent 0 40%,
            var(--ribbon-color) 40% 60%,
            transparent 60%
          );

        width: var(--width);
        height: var(--height);
        background-color: var(--color);
        background-image: var(--ribbon-gradient);
        position: relative;
        z-index: 20;
      }

      .gift::before {
        content: "";
        display: block;
        width: 30%;
        height: 100%;
        background:
          linear-gradient(#0004, #0004),
          var(--ribbon-gradient),
          linear-gradient(var(--color), var(--color));
        transform: translateX(300%);
      }

      .gift::after {
        content: "";
        display: block;
        width: 120%;
        height: 20%;
        position: absolute;
        top: -10px;
        border-bottom: 4px solid #0001;
        background:
          linear-gradient(to right,
            #9992 33%,
            var(--ribbon-color) 33% 50%,
            #9992 30% 75%,
            #1113 75% 85%,
            var(--ribbon-color) 85% 90%,
            #1113 90% 100%
          ),
          linear-gradient(var(--color), var(--color));
        transition: transform 0.5s ease-in-out;
      }

      :host(.open) .gift::after {
        transform: translateY(-70px);
      }

      :host(.open) .gift + img {
        transform: translate(10%, -80%);
      }

      img {
        width: var(--width);
        position: absolute;
        bottom: 0;
        transition: transform 0.5s ease-in-out;
        z-index: 15;
        transform: translate(10%, 0);
      }
    `;
  }

  connectedCallback() {
    this.render();

    const gift = this.shadowRoot.querySelector(".gift");
    const time = Math.floor(Math.random() * 5000);
    setTimeout(() => this.toggle(), time);
    // gift.addEventListener("click", () => this.toggle());
  }

  open() {
    this.classList.add("open");
    const time = Math.floor(Math.random() * 5000);
    setTimeout(() => this.close(), time);
  }

  close() {
    this.classList.remove("open");
    setTimeout(() => this.changeCharacter(), 1000);

    const time = 3000 + Math.floor(Math.random() * 10000);
    setTimeout(() => this.open(), time);
  }

  toggle() {
    this.classList.contains("open") ? this.close() : this.open();
  }

  changeCharacter() {
    const isClosed = !this.classList.contains("open");

    if (isClosed) {
      const n = Math.floor(Math.random() * CHARACTERS.length);
      this.image = CHARACTERS[n];
      this.shadowRoot.querySelector("img").src = this.image;
      console.log("Changed to " + this.image);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${XmasGift.styles}</style>
    <div class="gift"></div>
    <img src="${this.image}">
    `;
  }
}

customElements.define("xmas-gift", XmasGift);
