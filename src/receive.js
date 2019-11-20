const electron = require("electron");
const path = require("path");
const Mousetrap = require("mousetrap");
const { clipboard, remote, ipcRenderer, dialog } = require("electron");

codeInput = document.getElementById("code");

function placeHolder() {
    var hash = Math.random()
      .toString(36)
      .substr(2, 5);
  
    if (codeInput.setAttribute("placeholder", hash)) {
      console.log("Placed holder");
    }
  }

  setInterval(function() {
    placeHolder();
  }, 50);

document.getElementById("body").onfocus = function() {
    //console.log("Focus");
    codeInput.focus();
    getClipboard();
};