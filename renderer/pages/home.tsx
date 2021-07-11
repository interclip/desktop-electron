import React, { useState } from "react";
import Head from "next/head";

const MenuItem = (props) => {
  return (
    <a href={props.href}>
      <li className="px-4 py-4  list-none bg-white rounded-xl">
        {props.children}
      </li>
    </a>
  );
};

function Home() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <nav className="nav flex justify-between fixed top-2 px-5 w-full">
          <div className="flex gap-5">
            {menuOpened && (
              <>
                <MenuItem href="/home">Create a clip</MenuItem>
                <MenuItem href="/">Get a clip</MenuItem>
                <MenuItem href="/">About Interclip Desktop</MenuItem>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="rounded-xl px-4 py-4 bg-white text-black focus:outline-none"
          >
            {menuOpened ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </nav>
        <div className="flex flex-col content-center items-center text-white">
          <h2 className="text-5xl mt-40 mb-10">Paste your link here!</h2>
          <input
            type="url"
            name="input"
            className="urlbar border-solid rounded-3xl text-black"
            placeholder="https://youtu.be/dQw4w9WgXcQ"
            id="search-input"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
