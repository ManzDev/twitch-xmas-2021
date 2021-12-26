import "./components/XmasTree.js";
import "./components/XmasGift.js";

const AKALI_PIC = "https://static-cdn.jtvnw.net/jtv_user_pictures/1c379f6c-e06b-4724-96aa-046326da1385-profile_image-50x50.png";
const tree = document.querySelector("xmas-tree");

// eslint-disable-next-line
const client = new tmi.Client({ channels: ["ManzDev"] });
client.connect();

client.on("message", (channel, tags, message, self) => {
  const username = tags.username;
  fetch(`http://localhost:9999/api/userinfo/${username}`)
    .then(res => res.json())
    .then(user => {
      const name = user.name;
      const image = name === "m_akali" ? AKALI_PIC : user.picture;

      tree.setRandomBall(name, image);
    });
});
