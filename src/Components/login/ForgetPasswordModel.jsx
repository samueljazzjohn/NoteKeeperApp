import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD } from '../../mutations/userMutations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const ForgetPasswordModel = ({setForgetModel}) => {

    const [forgetPassword] = useMutation(FORGET_PASSWORD)
    const navigate = useNavigate()
    const [isLoading,setLoading]= useState(false)

    const {register,handleSubmit,formState:{errors}}=useForm({resolver: yupResolver(schema)})

    const onSubmit=(data)=>{
        setLoading(true)
        console.log(data)
        forgetPassword({variables:{email:data.email}}).then((response)=>{
            console.log(response)
            setForgetModel(false)
            toast.success("reset password email sent successfully")
            setLoading(false)

        }).catch((err)=>{
            console.log(err.message)
            toast.error("Please enter currect email address")
            setLoading(false)
        })
    }

    const handleClose=()=>{
        setForgetModel(false)
    }


  return (
    <>
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed pt-5 md:pt-52 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
        <div className="relative w-full max-w-md max-h-full space-y-2">

            <div className="relative bg-white rounded-lg border shadow-lg p-2 md:p-5">
                <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">Reset Password</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Your email</label>
                            <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                            <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.email && "p-1 mt-1 px-4"} rounded-md`}>{errors.email?.message}</p>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg  text-sm px-5 py-2.5 text-center">{ isLoading ? "Loading..." :"Reset Password"}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

const initialValues = {
    email: '',
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export default ForgetPasswordModel