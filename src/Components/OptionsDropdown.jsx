import React from 'react'

const OptionsDropdown = ({toggleListing,setOptionsState}) => {

    const handleClick=()=>{
        toggleListing()
        setOptionsState(false)
    }
  return (
    <>
        <div className='absolute top-10 right-3 border border-gray-300 rounded-md px-2 py-1 w-32 bg-white'>
            <div onClick={handleClick} className='font-display font-thin cursor-pointer'>list</div>
        </div>
    </>
  )
}

export default OptionsDropdown