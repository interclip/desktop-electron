import electron from "electron";
import path from "path";
import { bind } from "mousetrap";
import { clipboard, ipcRenderer } from "electron";

function isKeyPressed(event, expectedKey, expectedCode) {
  const code = event.which || event.keyCode;

  if (expectedKey === event.key || code === expectedCode) {
    return true;
  }
  return false;
}

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const exregex = new RegExp(expression);

function sendURL(urlInput = document.getElementById("search-input").value) {
  // send username to main.js
  const t = urlInput;
  if (t.match(exregex)) {
    ipcRenderer.send("asynchronous-message", urlInput);
  } else {
    ipcRenderer.send("show-error-box");
  }
  // receive message from main.js

  ipcRenderer.on("asynchronous-reply", (_event, code) => {
    if (code !== "") {
      document.getElementById("code").innerHTML =
        "code: <span id='theCode'>" + code + "</span>";
    } else {
      alert(code);
    }
  });
}

bind(["command+c", "ctrl+c"], () => {
  clipboard.writeText(
    document.getElementById("theCode").innerHTML,
    "selection"
  );
  console.log(`Copied: ${clipboard.readText("selection")}`);
  // return false to prevent default browser behavior
  // and stop event from bubbling
  return false;
});
document
  .getElementById("search-input")
  .addEventListener("keydown", (event) => {
      if (isKeyPressed(event, "Enter", 13)) {
        event.preventDefault();
        sendURL();
      }
    });

function getClipboard() {
  const t = clipboard.readText();
  if (t.match(exregex)) {
    sendURL(t);
    document.getElementById("search-input").value = clipboard.readText();
  }
}

document.getElementById("body").onfocus = () => {
  document.getElementById("search-input").focus();
  getClipboard();
};
getClipboard();
