const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  globalShortcut,
  ipcMain
} = require("electron");
const shell = require("electron").shell;
var path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const axios = require("axios");

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 400,
    minWidth: 500,
    icon: path.join(__dirname, "assets/icons/png/64.png"),
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    fullscreenable: false,
    backgroundColor: "#ec991f",
    show: false
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  // and load the index.html of the app.
  win.loadFile("src/clip.html");

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
  });
  var menu = Menu.buildFromTemplate([
    {
      label: "Interclip",
      submenu: [
        {
          label: "About",
          click() {
            shell.openExternal("http://uni.hys.cz/about");
          }
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  // receive message from index.html
  ipcMain.on("asynchronous-message", (event, url) => {
    console.log(url);
    axios.get(`http://uni.hys.cz/includes/api?url=${url}`).then(res => {
      const code = res.data;
      // send message to index.html
      event.sender.send("asynchronous-reply", code);
    });
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
