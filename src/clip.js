const electron = require("electron");
const path = require("path");
const Mousetrap = require("mousetrap");
const { clipboard, remote, ipcRenderer, dialog } = require("electron");

function isKeyPressed(event, expectedKey, expectedCode) {
  const code = event.which || event.keyCode;

  if (expectedKey === event.key || code === expectedCode) {
    return true;
  }
  return false;
}

var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
var regex = new RegExp(expression);

function sendURL(urlInput = document.getElementById("search-input").value) {
  // send username to main.js
  var t = urlInput;
  if (t.match(regex)) {
    ipcRenderer.send("asynchronous-message", urlInput);
  } else {
    ipcRenderer.send("show-error-box");

  }
  // receive message from main.js

  ipcRenderer.on("asynchronous-reply", (event, code) => {
    if (code != "") {
      document.getElementById("code").innerHTML =
        "code: <span id='theCode'>" + code + "</span>";
    }
  });
}

Mousetrap.bind(["command+c", "ctrl+c"], function() {
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
  .addEventListener("keydown", function(event) {
    if (isKeyPressed(event, "Enter", 13)) {
      event.preventDefault();
      sendURL();
    }
  });

function getClipboard() {

  var t = clipboard.readText();
  if (t.match(regex)) {
    sendURL(t);
    document.getElementById("search-input").value = clipboard.readText();
  }
}

document.getElementById("body").onfocus = function() {
  //console.log("Focus");
  getClipboard();
};
getClipboard();
