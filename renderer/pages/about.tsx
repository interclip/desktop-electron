import React from "react";
import Head from "next/head";
import Menu from "../components/Menu";

const About = () => {
  const appVersion = global.window && window.require('electron').remote.app.getVersion()

  return (
    <React.Fragment>
      <Head>
        <title>About | Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
          <h1 className="text-5xl mt-24">About Interclip Desktop</h1>
          <div className="info text-xl mt-6 text-center">
            <ul>
              <li>
                Version: {appVersion} (
                <a
                  className="underline"
                  href="https://github.com/aperta-principium/Interclip-Desktop/releases"
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
            </ul>

            <details>
              <summary className="mt-8">Technical details</summary>

              <ul>
                <li>Chrome: {process.versions.chrome}</li>
                <li>Node: {process.versions.node}</li>
                <li>Electron: {process.versions.electron}</li>
                <li>Architecture: {process.arch}</li>
                <li>Platform: {process.platform}</li>
              </ul>
            </details>
            <div className="mt-8"></div>
            <div>
              <a className="p-4 bg-white text-black rounded-xl cursor-pointer">Check for updates</a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
