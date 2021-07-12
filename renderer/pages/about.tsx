import React, { useState, useEffect } from "react";
import Head from "next/head";
const app = require("@electron/remote").app;
import Menu from "../components/Menu";

const About = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    setVersion(app.getVersion());
  });

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
                Version: {version} (
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
                <li>Architecture: {process.arch}</li>
                <li>Platform: {process.platform}</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
