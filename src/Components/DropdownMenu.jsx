import React from 'react'

const DropdownMenu = (props) => {


    const handleLoginModel = () => {
        props.setLoginModel(true)
        document.body.style.overflow = 'hidden'; 
    }

    const handleLogout = () => {
        props.setLoggedIn(false)
        localStorage.clear()
        window.location.reload();
    }
    return (
        <>
            {props.DropdownStatus && <div ref={props.refvar} id="dropdown" className="absolute top-3 md:top-8 right-8 z-90 translate-y-10 bg-white divide-y divide-gray-100 rounded-lg  w-44 border border-gray-500 shadow-lg">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {!localStorage.getItem('isLoggedIn') ? <li><a data-modal-target="defaultModal" data-modal-toggle="defaultModal" onClick={handleLoginModel} href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-500">login</a> </li>
                        : <>
                            <li>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-500">profile</a>
                            </li>
                            <li>
                                <a onClick={handleLogout} href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-500">Sign out</a>
                            </li>
                        </>
                    }
                </ul>
            </div>}

        </>
    )
}

export default DropdownMenu