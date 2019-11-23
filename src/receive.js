const electron = require("electron");
const path = require("path");
const Mousetrap = require("mousetrap");
const { clipboard, remote, ipcRenderer, dialog } = require("electron");

codeInput = document.getElementById("code");

function isKeyPressed(event, expectedKey, expectedCode) {
    const code = event.which || event.keyCode;
  
    if (expectedKey === event.key || code === expectedCode) {
      return true;
    }
    return false;
}

function placeHolder() {
  var hash = Math.random()
    .toString(36)
    .substr(2, 5);

  codeInput.setAttribute("placeholder", hash);
}

function sendCode(urlInput = codeInput.value) {
    console.log("Sending: " + urlInput);
    // send username to main.js
    var t = codeInput.value;
    if (t.length <= 5) {
      ipcRenderer.send("recieve-code", urlInput);
    } else {
      ipcRenderer.send("show-error-box");
    }
    // receive message from main.js
  
    ipcRenderer.on("url-reply", (event, code) => {
      if (code != "") {
        document.getElementById("result").innerHTML =
          "<span id='theCode'>" + code + "</span>";
      } else {
          alert("Got " + code);
      }
    });
  }


setInterval(function() {
  placeHolder();
}, 50);

document.getElementById("body").onfocus = function() {
  //console.log("Focus");
  codeInput.focus();
};

document
  .addEventListener("keydown", function(event) {
    if (isKeyPressed(event, "Enter", 13)) {
      event.preventDefault();
      sendCode();
    }
  });