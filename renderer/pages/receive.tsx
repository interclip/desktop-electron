import React, { useState } from "react";
import Head from "next/head";

import Menu from "../components/Menu";

function Home() {
  const [codeInput, setCodeInput] = useState("");
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [resultURL, setURL] = useState("");
  return (
    <React.Fragment>
      <Head>
        <title>Receive a clip | Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
          {!codeSubmitted && (
            <h2 className="text-5xl mt-40 mb-10">Get your link here!</h2>
          )}
          <form
            onSubmit={(e) => {
              // Prevent default form behavior
              e.preventDefault();

              // Disable the input
              setCodeSubmitted(true);

              fetch(`https://staging.interclip.app/api/get?code=${codeInput}`)
                .then((res) => res.json())
                .then((json) => {
                  setURL(json.result);
                })
                .catch((err) => {});
              return false;
            }}
            onClick={() => {
              setCodeSubmitted(false);
              setURL("");
            }}
            className={codeSubmitted ? "mt-20" : undefined}
          >
            <input
              maxLength={5}
              name="input"
              disabled={codeSubmitted}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="receive-bar w-64 border-none rounded text-black text-center"
              placeholder="😳🤩😇😲😋"
              id="search-input"
            />
          </form>
          {codeSubmitted && (
            <>
              <div className="mt-12 text-center">
                <span className="text-2xl">is the URL</span>
              </div>
              <div className="mt-6 text-center">
                <span className="mt-20 text-4xl">{resultURL}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
