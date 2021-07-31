import React, { useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import moji from "randmoji";
import { clipboard } from "electron";
import { useHotkeys } from "react-hotkeys-hook";

import Menu from "../components/Menu";

const Receive = () : React.ReactFragment => {
  const [codeInput, setCodeInput] = useState("");
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [resultURL, setURL] = useState("");

  useHotkeys("ctrl+c", () => {
    toast.success("Copied the URL to clipboard");
    clipboard.writeText(resultURL);
  });

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
                  .then((res) => {
                    switch (res.status) {
                      case 200:
                        return res.json();
                      case 400:
                        toast.error(
                          "Something went wrong in the app! Please submit a bug report"
                        );
                        break;
                      case 404:
                        toast.error("The code you entered has not been found");
                        break;
                      case 418:
                        toast("Yummy!", {
                          icon: "🫖",
                        });
                        break;
                      case 429:
                        toast.error("You are making too many requests!");
                        break;
                      case 500:
                      case 501:
                      case 502:
                      case 503:
                      case 504:
                        toast.error(
                          "Something went wrong! Please try again later"
                        );
                        break;
                    }
                    setCodeSubmitted(false);
                    return false;
                  })
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
              autoFocus={true}
            />
          </form>
          {codeSubmitted && (
            <>
              <div className="mt-12 text-center">
                <span className="text-2xl">is the URL</span>
              </div>
              <div className="mt-6 text-center w-1/2 break-all">
                <span className="mt-20 text-4xl">{resultURL}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Receive;
