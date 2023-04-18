import React from 'react'

const DropdownMenu = (props) => {
    return (
        <>
            {props.DropdownStatus && <div ref={props.refVar} id="dropdown" class=" absolute top-3 right-8 z-10 translate-y-10 bg-white divide-y divide-gray-100 rounded-lg  w-44 border border-gray-500 shadow-lg">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:text-gray-500">profile</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:text-gray-500">Sign out</a>
                    </li>
                </ul>
            </div>}

        </>
    )
}

export default DropdownMenu