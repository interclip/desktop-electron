const electron = require("electron");
const path = require("path");
const { clipboard } = require("electron");

function isKeyPressed(event, expectedKey, expectedCode) {
  const code = event.which || event.keyCode;

  if (expectedKey === event.key || code === expectedCode) {
    return true;
  }
  return false;
}

document
  .getElementById("search-input")
  .addEventListener("keydown", function(event) {
    if (isKeyPressed(event, "Enter", 13)) {
      event.preventDefault();
      console.log("enter was pressed and is prevented");

      let username = document.getElementById("search-input").value;

      const { ipcRenderer } = require("electron");

      // send username to main.js
      ipcRenderer.send("asynchronous-message", username);

      // receive message from main.js
      ipcRenderer.on("asynchronous-reply", (event, code) => {
        console.log(code);
        document.getElementById("code").innerHTML = "Code: "+code;
        clipboard.writeText(code, "selection");
        console.log(`Copied: ${clipboard.readText("selection")}`);
      });
    }
  });
