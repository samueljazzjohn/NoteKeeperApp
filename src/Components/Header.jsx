import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import {FaUserCircle} from 'react-icons/fa'

function Header({dropDown,setDropdown}) {

  const handleDropdown=()=>{
    setDropdown(!dropDown)
  }
  return (
    <header className="sticky top-0 h-[10%] bg-[#f5ba13] flex flex-row justify-between items-center px-10 z-20">
      <h1 className="text-red text-white font-display font-[600] text-[30px]">
        <HighlightIcon className="-translate-y-1 m-2"/>
        Keeper
      </h1>
      <FaUserCircle onClick={handleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white cursor-pointer" size={25} />
    </header>
  );
}

export default Header;
