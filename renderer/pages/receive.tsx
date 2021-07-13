import React, { useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import moji from "randmoji";

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
        <Toaster />
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
          {!codeSubmitted && (
            <h2 className="text-5xl mt-40 mb-10">Get your link here!</h2>
          )}
          <form
            onSubmit={(e) => {
              // Prevent default form behavior
              e.preventDefault();
              if (codeInput.length === 0) {
                toast.error("You must enter a code to receive a clip.");
              } else if (codeInput.length !== 5) {
                toast.error("Your code must be 5 characters long");
              } else if (codeInput.match(/^([A-Z]|[0-9]){5}$/gi)) {
                // Disable the input
                setCodeSubmitted(true);

                fetch(`https://staging.interclip.app/api/get?code=${codeInput}`)
                  .then((res) => res.json())
                  .then((json) => {
                    setURL(json.result);
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
                return false;
              } else {
                toast.error("Your code contains invalid characters");
              }
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
              placeholder={moji(5)}
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
