import React, { useState, useEffect } from "react";
import Head from "next/head";
import QRCode from "react-qr-code";
import { clipboard } from "electron";
import isURL from "validator/lib/isURL";
import toast, { Toaster } from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";

import Menu from "../components/Menu";

const Home = () : React.ReactFragment => {
  const [linkInput, setLinkInput] = useState("");
  const [linkSubmitted, setLinkSubmitted] = useState(false);
  const [code, setCode] = useState("");

  useHotkeys("ctrl+c", () => {
    toast.success("Copied the code to clipboard");
    clipboard.writeText(code);
  });

  const submitForm = (link: string = linkInput) => {
    if (isURL(link)) {
      // Disable the input
      setLinkSubmitted(true);

      fetch(`https://interclip.app/api/set?url=${link}`)
        .then((res) => {
          // Switch for different status codes
          switch (res.status) {
            case 200:
              return res.json();
            case 400:
              res.json().then((error) => {
                toast.error(error.result);
              });
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
              toast.error("Something went wrong! Please try again later");
              break;
          }
          setLinkSubmitted(false);
          return false;
        })
        .then((json) => {
          setCode(json.result);
        })
        .catch((err) => {
          toast.error(err);
        });
    } else if (link.length > 0) {
      toast.error("Invalid URL");
    } else {
      toast.error("Please enter a URL");
    }
  };

  useEffect(() => {
    if (!linkSubmitted) {
      const readValue = clipboard.readText();

      if (isURL(readValue)) {
        toast.success("Pasted from the clipboard");
        submitForm(readValue);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Toaster />
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
                  bgColor="transparent"
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
