const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}};m();const b=8e3,u=1500;class r extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}setAvatar(e,s){this.name=e;const o=this.shadowRoot.querySelector(".ball:not(.image)");o.style.backgroundImage=`url(${s})`,o.classList.add("image"),this.turnOn()}turnOn(){this.shadowRoot.querySelector(".ball").classList.add("on"),setTimeout(()=>this.turnOff(),b)}turnOff(){const e=this.shadowRoot.querySelector(".ball");e.classList.remove("on"),e.style.backgroundSize="cover",e.style.backgroundPosition="center",setTimeout(()=>this.disappear(),u);const s=new CustomEvent("DEL_USER",{detail:{name:this.name},composed:!0});this.dispatchEvent(s)}disappear(){const e=this.shadowRoot.querySelector(".ball");e.classList.remove("image"),e.style.backgroundImage="",e.style.backgroundSize="",e.style.backgroundPosition=""}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${r.styles}</style>
    <div class="ball model-1">
    </div>`}}customElements.define("xmas-ball",r);class i extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.totalBalls=17,this.users=[]}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.addEventListener("DEL_USER",e=>this.delUser(e.detail.name))}setRandomBall(e,s){if(this.users.includes(e))return;this.addUser(e);const o=Math.floor(Math.random()*this.totalBalls);this.setBall(o,e,s)}addUser(e){this.users.push(e)}delUser(e){this.users=this.users.filter(s=>s!==e)}setBall(e,s,o){if(e>this.totalBalls)return;this.shadowRoot.querySelectorAll("xmas-ball")[e].setAvatar(s,o)}render(){this.shadowRoot.innerHTML=`
    <style>${i.styles}</style>
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
    </div>`}}customElements.define("xmas-tree",i);const c=["avocado.svg","spherical-cow.svg","manzdev.svg","dorito.svg","controller.svg","glados.svg","parkour.svg","scientific-avocado.svg"];class n extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.image="avocado.svg"}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.shadowRoot.querySelector(".gift");const e=Math.floor(Math.random()*5e3);setTimeout(()=>this.toggle(),e)}open(){this.classList.add("open");const e=Math.floor(Math.random()*5e3);setTimeout(()=>this.close(),e)}close(){this.classList.remove("open"),setTimeout(()=>this.changeCharacter(),1e3);const e=3e3+Math.floor(Math.random()*1e4);setTimeout(()=>this.open(),e)}toggle(){this.classList.contains("open")?this.close():this.open()}changeCharacter(){if(!this.classList.contains("open")){const s=Math.floor(Math.random()*c.length);this.image=c[s],this.shadowRoot.querySelector("img").src=this.image,console.log("Changed to "+this.image)}}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="gift"></div>
    <img src="${this.image}">
    `}}customElements.define("xmas-gift",n);const p="https://static-cdn.jtvnw.net/jtv_user_pictures/1c379f6c-e06b-4724-96aa-046326da1385-profile_image-50x50.png",v=document.querySelector("xmas-tree"),d=new tmi.Client({channels:["ManzDev"]});d.connect();d.on("message",(h,e,s,o)=>{const t=e.username;fetch(`http://localhost:9999/api/userinfo/${t}`).then(a=>a.json()).then(a=>{const l=a.name,g=l==="m_akali"?p:a.picture;v.setRandomBall(l,g)})});
