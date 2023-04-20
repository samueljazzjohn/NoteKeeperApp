import React from 'react'

const LoginModel = ({setLoginModel,setLoggedIn}) => {

    const handleLogin = () => {}
    const handleClose = () => {
        setLoginModel(false)
        document.body.style.overflow = 'auto'; 
    }
    return (
        <>
            <div id="defaultModal" tabindex="-1" aria-hidden="true"  className="fixed py-5 md:pt-52 px-5 md:px-[35%] right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg border shadow-lg">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">SignIn</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border focus:outline-none border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                                        </div>
                                        <label for="remember" className="ml-2 text-sm font-medium text-gray-900 ">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm text-blue-700 hover:underline">Lost Password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                                <div className="text-sm font-medium text-gray-500 ">
                                    Not registered? <a href="#" className="text-blue-700 hover:underline">Create account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModel