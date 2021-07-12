import { app, autoUpdater, dialog, ipcMain } from "electron";
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

  // Change the UI to reflect whether the app is in development mode
  ipcMain.on("dev-request", (event) => {
    event.sender.send("dev-reply", !isProd);
  });

  if (isProd) {
    const server: string = "https://update.electronjs.org";
    const feed: string = `${server}/interclip/desktop/${process.platform}-${
      process.arch
    }/${app.getVersion()}`;

    autoUpdater.setFeedURL(feed);

    // Check for updates every 30 minutes
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 30 * 60 * 1000);

    autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: "info",
        buttons: ["Restart", "Later"],
        title: "Application Update",
        message: process.platform === "win32" ? releaseNotes : releaseName,
        detail:
          "A new version has been downloaded. Restart the application to apply the updates.",
      };

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall();
      });
    });

    ipcMain.on("synchronous-message", (event, arg) => {
      if (arg === "check-update") {
        autoUpdater.checkForUpdates();
      }
      event.returnValue = "done";
    });

    autoUpdater.on("update-not-available", () => {
      const dialogOpts = {
        type: "info",
        buttons: ["Retry", "OK"],
        title: "Application Update",
        message: "No updates available, you are on the newest build!",
      };

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.checkForUpdates();
      });
    });

    autoUpdater.on("error", (message) => {
      dialog.showErrorBox(
        "There was a problem updating the application",
        message.toString()
      );
    });
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
