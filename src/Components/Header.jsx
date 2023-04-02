import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';

function Header() {
  return (
    <header className="sticky top-0 h-[8%] bg-[#f5ba13] flex flex-row justify-start items-center pl-10 z-20">
      <h1 className="text-red text-white font-display font-[600] text-[30px]">
        <HighlightIcon className="-translate-y-1 m-2"/>
        Keeper
      </h1>
    </header>
  );
}

export default Header;
