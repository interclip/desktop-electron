import React, { useState, useEffect } from "react";
import Head from "next/head";
import QRCode from "react-qr-code";
import { clipboard } from "electron";
import isURL from "validator/lib/isURL";

import Menu from "../components/Menu";

function Home() {
  const [linkInput, setLinkInput] = useState("");
  const [linkSubmitted, setLinkSubmitted] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const submitForm = (link: string = linkInput) => {
    // Disable the input
    setLinkSubmitted(true);

    // ToDo: Add link validation

    fetch(`https://staging.interclip.app/api/set?url=${link}`)
      .then((res) => res.json())
      .then((json) => {
        setCode(json.result);
      })
      //.catch((err) => {});
  };

  useEffect(() => {
    const readValue = clipboard.readText();

    if (isURL(readValue)) {
      submitForm(readValue);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
          {!linkSubmitted && (
            <h2 className="text-5xl mt-40 mb-10">Paste your link here!</h2>
          )}
          <form
            onSubmit={(e) => {
              // Prevent default form behavior
              e.preventDefault();
              submitForm();
              return false;
            }}
            onClick={() => {
              setLinkSubmitted(false);
              setCode("");
            }}
            className={linkSubmitted ? "mt-20" : undefined}
          >
            <input
              type="url"
              name="input"
              disabled={linkSubmitted}
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className={`${
                linkSubmitted && "cursor-pointer"
              } urlbar border-solid rounded-3xl text-black text-center`}
              placeholder="https://youtu.be/dQw4w9WgXcQ"
              id="search-input"
            />
          </form>
          {linkSubmitted && (
            <>
              <div className="mt-12 text-center">
                <span className="text-2xl">is the code</span>
              </div>
              <div className="mt-6 text-center">
                <span className="mt-20 text-6xl">{code}</span>
              </div>
              <div className="mt-6 text-center">
                <QRCode
                  value={`https://interclip.app/${code}`}
                  bgColor="#157EFB"
                  fgColor="#fff"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
