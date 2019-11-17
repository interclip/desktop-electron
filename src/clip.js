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
function sendURL() {
    let username = document.getElementById("search-input").value;

    const { ipcRenderer } = require("electron");

    // send username to main.js
    ipcRenderer.send("asynchronous-message", username);

    // receive message from main.js
    ipcRenderer.on("asynchronous-reply", (event, code) => {
      if(code != "") {
          document.getElementById("code").innerHTML = "Code: "+code;
          clipboard.writeText(code, "selection");
          console.log(`Copied: ${clipboard.readText("selection")}`);
      }
    });
}

document
  .getElementById("search-input")
  .addEventListener("keydown", function(event) {
    if (isKeyPressed(event, "Enter", 13)) {
        event.preventDefault();
        sendURL();
    }
  });
  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  var regex = new RegExp(expression);
  var t = clipboard.readText();
  if (t.match(regex)) {
    alert("Successful match");
  } else {
    alert("No match");
  }
  
  document.getElementById("body").onfocus = function(){console.log("Focus");document.getElementById("search-input").value = clipboard.readText();;sendURL()}; 
  

