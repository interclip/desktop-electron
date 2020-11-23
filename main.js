const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  ipcMain,
} = require("electron");

const shell = require("electron").shell;
const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const axios = require("axios");

//handle setupevents as quickly as possible
const setupEvents = require("./installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const endpoint = "https://link.mannoviny.cz";

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 400,
    minWidth: 500,
    icon: path.join(__dirname, "assets/icons/png/64.png"),
    frame: false, // for Windows
    titleBarStyle: "hidden", // for MacOS
    webPreferences: {
      nodeIntegration: true,
    },
    fullscreenable: false,
    backgroundColor: "#ec991f",
    show: false,
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  // and load the index.html of the app.
  win.loadFile("src/clip.html");

  // Open the DevTools.
  //win.webContents.openDevTools();

  app.setUserTasks([]);

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "Interclip",
      submenu: [
        {
          label: "About",
          click() {
            shell.openExternal(`${endpoint}/about`);
          },
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  // receive message from index.html
  ipcMain.on("asynchronous-message", (event, url) => {
    axios
      .get(`${endpoint}/includes/api?url=${url}`)
      .then((res) => {
        const code = res.data.result;
        // send message to index.html
        event.sender.send("asynchronous-reply", code);
      })
      .catch((err) => dialog.showErrorBox("There is an error with your URL", `${err}`));
  });
  ipcMain.on("recieve-code", (event, code) => {
    if(code.length !== 5) {
      dialog.showErrorBox("Error with your code", `This code should be 5 characters long, not ${code.length}, please correct that.`);
    } else {
    axios
      .get(`${endpoint}/includes/get-api?code=${code}`)
      .then((res) => {
        const url = res.data.result;
        // send message to index.html
        event.sender.send("url-reply", url);
      })
      .catch((err) => {dialog.showErrorBox(`Seems like... that isn't a code at all!`, `(${err})`)});
    }
  });
  ipcMain.on("show-error-box", (_event, _arg) => {
    dialog.showErrorBox(
      "Oops, this shouldn't have happened!",
      "Your URL is probably not in the right format. Remember to write http/https."
    );
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
