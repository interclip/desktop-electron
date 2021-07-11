import React from "react";
import Head from "next/head";

import Menu from "../components/Menu";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Receive a clip | Interclip</title>
      </Head>
      <div className="w-full h-screen">
        <Menu />
        <div className="flex flex-col content-center items-center text-white">
          <h2 className="text-5xl mt-40 mb-10">Get your link here!</h2>
          <input
            maxLength={5}
            type="url"
            name="input"
            className="receive-bar w-64 border-none rounded text-black text-center"
            placeholder="😳🤩😇😲😋"
            id="search-input"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
