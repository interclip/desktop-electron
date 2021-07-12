import { app, autoUpdater, dialog } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

require("@electron/remote/main").initialize();

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    minWidth: 800,
    minHeight: 500,
    height: 600,
    width: 1000,
    backgroundColor: "#157EFB",
    autoHideMenuBar: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  if (isProd) {
    const server: string = "https://update.electronjs.org";
    const feed: string = `${server}/interclip/desktop/${process.platform}-${
      process.arch
    }/${app.getVersion()}`;

    dialog.showMessageBox(mainWindow, {
      title: "Stuff's happening",
      message: `Checking for updates... ${feed}`,
    });

    autoUpdater.setFeedURL(feed);

    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 30 * 60 * 1000);
  }

  // Open new windows in the default browser in Electon.
  mainWindow.webContents.on("new-window", (e: Event, url: string) => {
    e.preventDefault(); // Don't open a new window in the app
    require("electron").shell.openExternal(url); // Open in default browser
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    // Show the DevTools if we're in development mode.
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
