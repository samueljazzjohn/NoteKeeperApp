import React from 'react'

const OptionsDropdown = ({toggleListing,setOptionsState}) => {

    const handleClick=(state)=>{
        toggleListing(state)
        setOptionsState(false)
    }
  return (
    <>
        <div className='absolute flex flex-col justify-start items-center top-10 right-3 border border-gray-300 rounded-md px-2 py-1 w-32 bg-white'>
            <div onClick={()=>{handleClick(false)}} className='w-full font-display font-thin cursor-pointer border-b-2 text-center'>Text</div>
            <div onClick={()=>{handleClick(true)}} className='w-full font-display font-thin cursor-pointer text-center'>List</div>
        </div>
    </>
  )
}

export default OptionsDropdown