import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover } from 'react-tiny-popover';
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../mutations/userMutations'
import { toast } from 'react-hot-toast';


const RegistrationModel = ({ setRegistrationModel, setLoginModel }) => {

    const [registerUser] = useMutation(REGISTER_USER);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const handleClose = () => {
        setRegistrationModel(false)
        document.body.style.overflow = 'auto';
    }

    const onSubmit = (data) => {
        console.log(data)
        registerUser({ variables: { username: data.username, email: data.email, password: data.password } })
        .then((res) => {
             console.log(res) 
             toast.success('Registration Successful')
                setRegistrationModel(false)
                setLoginModel(true)
        })
        .catch((err) => { console.log(err) })
        reset();
    }

    const handleLogin = () => {
        setLoginModel(true)
        setRegistrationModel(false)
    }

    return (
        <>
            <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed pt-5 md:pt-24 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg border shadow-lg">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">Create Account</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                                <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input {...register('username')} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="eg. Samuel Johnson" />
                                    <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.username && "p-1 mt-1 px-4"} rounded-md`}>{errors.username?.message}</p>
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                    <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                                    <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.email && "p-1 mt-1 px-4"} rounded-md`}>{errors.email?.message}</p>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input {...register('password')} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                                    <p className={`text-sm bg-red-600 opacity-80 text-white ${errors.password && "p-1 mt-1 px-4"}  rounded-md`}>{errors.password?.message}</p>
                                </div>
                                <div>
                                    <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <input {...register('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                                    <p className={`text-sm bg-red-600 opacity-80 text-white ${errors.confirmPassword && "p-1 mt-1 px-4"}  rounded-md`}>{errors.confirmPassword?.message}</p>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                                <div className="text-sm font-medium text-gray-500 ">
                                    Already registered? <a onClick={handleLogin} href="#" className="text-blue-700 hover:underline"> Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false
}

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

export default RegistrationModel