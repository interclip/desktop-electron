import React, { useState, useEffect } from "react";
import Link from "next/link";

const MenuItem = (props: {
  href: string;
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}): JSX.Element => {
  return (
    <Link href={props.href}>
      <li className="menu-item px-4 py-4 cursor-pointer list-none bg-white rounded-xl dark:text-white">
        {props.children}
      </li>
    </Link>
  );
};

const Menu = (): JSX.Element => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const appVersion =
    global.window && window.require("electron").remote.app.getVersion();

  useEffect(() => {
    setDebugInfo(`
## Debug info
- Version: ${appVersion}
- Chrome: ${process.versions.chrome}
- Node: ${process.versions.node}
- Electron: ${process.versions.electron}
- Architecture: ${process.arch}
- Platform: ${process.platform}
    `);
  }, []);

  return (
    <nav className="nav flex justify-between fixed top-2 px-5 w-full">
      <div className="flex gap-5">
        {menuOpened && (
          <>
            <MenuItem href="/home">Create a clip</MenuItem>
            <MenuItem href="/receive">Get a clip</MenuItem>
            <MenuItem href="/about">About Interclip Desktop</MenuItem>
            <a
              title="Report a bug"
              target="_blank"
              href={`https://github.com/interclip/desktop/issues/new?title=bug:&body=${encodeURIComponent(
                debugInfo
              )}`}
              className="menu-item px-4 py-4 cursor-pointer list-none bg-white rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M463.55 272.13H400v-48.2q0-4.32-.27-8.47c29.57-27.88 32.25-64.63 32.27-103 0-8.61-6.64-16-15.25-16.41A16 16 0 00400 112c0 28-1.86 48.15-9.9 63.84-19.22-41.15-65.78-63.91-134.1-63.91-39.8 0-74.19 9.13-99.43 26.39-14.9 10.19-26.2 22.91-33.7 37.72C114 160.65 112 141 112 112.46c0-8.61-6.6-16-15.2-16.44A16 16 0 0080 112c0 37.63 2.61 73.73 32.44 101.63q-.43 5.06-.44 10.3v48.2H48.45c-8.61 0-16 6.62-16.43 15.23a16 16 0 0016 16.77h64V320a143.32 143.32 0 0010.39 53.69C96.74 396.64 80.18 422 80 463.34c0 8.74 6.62 16.3 15.36 16.65A16 16 0 00112 464c0-27.66 9.1-44.71 26.17-61.32A144.37 144.37 0 00220 459.42a16 16 0 0020-15.49V192.45c0-8.61 6.62-16 15.23-16.43A16 16 0 01272 192v251.93a16 16 0 0020 15.49 144.4 144.4 0 0081.82-56.74c17 16.54 26.09 33.52 26.17 60.95a16.27 16.27 0 0015.1 16.37A16 16 0 00432 464c0-41.68-16.6-67.23-42.39-90.31A143.32 143.32 0 00400 320v-15.87h64a16 16 0 0016-16.77c-.42-8.61-7.84-15.23-16.45-15.23z" />
                <path d="M321.39 104l.32.09c13.57 3.8 25.07-10.55 18.2-22.85A95.86 95.86 0 00256.21 32h-.42a95.87 95.87 0 00-84.19 50.13c-6.84 12.58 5.14 27 18.84 22.86 19.71-6 41.79-9.06 65.56-9.06 24.09 0 46.09 2.72 65.39 8.07z" />
              </svg>
            </a>
          </>
        )}
      </div>

      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="rounded-xl px-4 py-4 bg-white text-black menu-item focus:outline-none"
      >
        {!menuOpened ? (
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
  );
};

export default Menu;
