import React,{useState} from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import {FaUserCircle} from 'react-icons/fa'
import SearchIcon from '@mui/icons-material/Search';
import {useForm} from 'react-hook-form'

function Header({dropDown,setDropdown}) {

  const {register,handleSubmit,formState:{errors}}=useForm()
  const [isClicked,setClicked]=useState(false)

  const onSubmit=(data)=>{
    console.log(data)
  }

  const handleDropdown=()=>{
    setDropdown(!dropDown)
  }

  const handleSearchBar=()=>{
    setClicked(true)
  }
  return (
    <header className="sticky top-0 h-[10%] md:h-[8%] bg-[#f5ba13] flex flex-row justify-between items-center px-10 z-20">
      <div className="flex flex-row">
      <h1 className="text-white font-display font-[600] text-[30px]">
        <HighlightIcon className="-translate-y-1 m-2"/>
        Keeper
      </h1>
      <SearchIcon onClick={handleSearchBar} className="text-white cursor-pointer ml-3 translate-y-2" size={50} />
        {isClicked && <form className='ml-2 translate-y-2 transition-all duration-1000 ease-in visible '>
          <input type="text" {...register('search')} onKeyDown={(e)=>{if(e.key==='Enter'){handleSubmit(onSubmit)()}}} className="bg-transparent border border-white text-white placeholder:text-white rounded-xl px-3 focus:outline-none focus:ring-0" placeholder="Search..." />
          <button type="submit" className="hidden">Submit</button>
        </form>}
      </div>
      
      <div className="flex flex-row justify-center items-center space-x-3">
        <h2 className="text-white text-[15px] font-semibold">{localStorage.getItem('isLoggedIn')&&localStorage.getItem('username')}</h2>
      <FaUserCircle onClick={handleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white cursor-pointer" size={25} />
        </div>
    </header>
  );
}

export default Header;
