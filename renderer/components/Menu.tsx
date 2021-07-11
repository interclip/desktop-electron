import React, { useState } from "react";

const MenuItem = (props: {
  href: string;
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}): JSX.Element => {
  return (
    <a href={props.href}>
      <li className="px-4 py-4  list-none bg-white rounded-xl">
        {props.children}
      </li>
    </a>
  );
};

const Menu = (): JSX.Element => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <nav className="nav flex justify-between fixed top-2 px-5 w-full">
      <div className="flex gap-5">
        {menuOpened && (
          <>
            <MenuItem href="/home">Create a clip</MenuItem>
            <MenuItem href="/receive">Get a clip</MenuItem>
            <MenuItem href="/">About Interclip Desktop</MenuItem>
          </>
        )}
      </div>

      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="rounded-xl px-4 py-4 bg-white text-black focus:outline-none"
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
