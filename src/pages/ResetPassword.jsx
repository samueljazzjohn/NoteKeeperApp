import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../mutations/userMutations';

const ResetPassword = () => {

    const navigate = useNavigate()

    const [resetPassword] = useMutation(RESET_PASSWORD);
    const {token} = useParams();
    console.log(token)

    const {register,handleSubmit,formState:{errors}}=useForm({resolver: yupResolver(schema)})

    const onSubmit=(data)=>{
        resetPassword({variables:{password:data.password,token:token}}).then((response)=>{
            console.log(response)
            navigate('/reset-message',{state:{status:true}},{ replace: true })
        }).catch((err)=>{
            console.log(err.message)
            navigate('/reset-message',{state:{status:false}},{ replace: true })
        })
    }
  return (
    <>
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed pt-5 md:pt-52 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
        <div className="relative w-full max-w-md max-h-full space-y-2">

            <div className="relative bg-white rounded-lg border shadow-lg p-2 md:p-5">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">Reset Password</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">New Passowrd</label>
                            <input {...register('password')} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="********" />
                            <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.password && "p-1 mt-1 px-4"} rounded-md`}>{errors.password?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Confirm Passowrd</label>
                            <input {...register('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="********" />
                            <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.confirmPassword && "p-1 mt-1 px-4"} rounded-md`}>{errors.confirmPassword?.message}</p>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

const initialValues = {
    password: '',
    confirmPassword: '',
}

const schema = yup.object().shape({
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});


export default ResetPassword