import React, { useState, useEffect, ReactFragment } from "react";
import Head from "next/head";
import { ipcRenderer } from "electron";

import Menu from "../components/Menu";

const About = () : React.ReactFragment => {
  const appVersion =
    global.window && window.require("electron").remote.app.getVersion();

  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    ipcRenderer.send("dev-request", "");

    ipcRenderer.on("dev-reply", function (_event, args: boolean) {
      setIsDev(args);
    }); 
  });

  return (
    <React.Fragment>
      <Head>
        <title>About | Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
        <img src="/images/logo.png" alt="Picture of the author" width={256} height={256} />
          <h1 className="text-5xl mt-12">About Interclip Desktop</h1>
          <div className="info text-xl mt-6 text-center">
            <ul>
              <li>
                Version: {appVersion} (
                <a
                  className="underline"
                  href={`https://github.com/aperta-principium/Interclip-Desktop/releases/tag/v${appVersion}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  release notes ↗
                </a>
                )
              </li>
              <li>
                <a
                  className="underline"
                  href="https://interclip.app/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy ↗
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://github.com/interclip/desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code ↗
                </a>
              </li>
            </ul>

            <details>
              <summary className="mt-8">Technical details</summary>

              <ul className="mb-12">
                <li>Chrome: {process.versions.chrome}</li>
                <li>Node: {process.versions.node}</li>
                <li>Electron: {process.versions.electron}</li>
                <li>Architecture: {process.arch}</li>
                <li>Platform: {process.platform}</li>
              </ul>
            </details>
            {!isDev && (
              <>
                <div className="mt-8"></div>
                <div>
                  <a
                    className="p-4 bg-white text-black rounded-xl cursor-pointer"
                    onClick={() => {
                      ipcRenderer
                        .invoke("check-update", "dew-it")
                        .then((result) => {
                          alert(result);
                        });
                    }}
                  >
                    Check for updates
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
