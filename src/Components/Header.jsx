import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import {FaUserCircle} from 'react-icons/fa'

function Header({dropDown,setDropdown}) {

  const handleDropdown=()=>{
    setDropdown(!dropDown)
  }
  return (
    <header className="sticky top-0 h-[10%] md:h-[8%] bg-[#f5ba13] flex flex-row justify-between items-center px-10 z-20">
      <h1 className=" text-white font-display font-[600] text-[30px]">
        <HighlightIcon className="-translate-y-1 m-2"/>
        Keeper
      </h1>
      <div className="flex flex-row justify-center items-center space-x-3">
        <h2 className="text-white text-[15px] font-semibold">{localStorage.getItem('isLoggedIn')&&localStorage.getItem('username')}</h2>
      <FaUserCircle onClick={handleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white cursor-pointer" size={25} />
        </div>
    </header>
  );
}

export default Header;
