import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../../Services/Mutations/userMutations';
import { toast } from 'react-hot-toast';
import FacebookLogin from 'react-facebook-login';
import GithubLogin from 'react-github-login';
import { FaFacebookSquare } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import { useFacebookLogin } from '../../../hooks/useFacebookLogin.ts';
import { useGithubLogin } from '../../../hooks/useGithubLogin.ts';
import { useGoogleOAuth } from '../../../hooks/useGoogleOAuth.ts';
import getConfig from '../../../Config/config';


const LoginModel = ({ setLoginModel, setLoggedIn, setRegistrationModel, setForgetModel, setLoading }) => {

    const { REACT_APP_FACEBOOK_APP_ID, REACT_APP_GITHUB_CLIENT_ID,REACT_APP_GITHUB_REDIRECT_URI } = getConfig();
    const navigate = useNavigate()
    const [loginUser] = useMutation(LOGIN_USER);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const handleClose = () => {
        setLoginModel(false)
        document.body.style.overflow = 'auto';
    }

    const handleResetPassword = () => {
        setLoginModel(false)
        setForgetModel(true)
    }

    const onSubmit = (data) => {
        loginUser({ variables: { email: data.email, password: data.password } }).then((res) => {
            toast.success('Login Successful')
            localStorage.setItem('token', res.data.login.token)
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('user', res.data.login.user.username)
            navigate('/home')
            setLoggedIn(true)
            handleClose()
        }).catch((err) => {
            console.log(err)
            toast.error('Login Failed')
        })
        reset();
    }

    const handleRegister = () => {
        setLoginModel(false)
        setRegistrationModel(true)
    }

    const { handleFacebookLogin } = useFacebookLogin({ setLoggedIn, handleClose });
    const { handleGithubLogin } = useGithubLogin({ setLoggedIn, setLoading, handleClose, navigate });
    const { googleLogin } = useGoogleOAuth({ setLoggedIn, setLoading, handleClose, navigate });

    const handleSuccess = (response) => {
        handleGithubLogin(response?.code)
      };

      const handleFailure = (err) => {
        toast.error("failed to login to github")
      };


    return (
        <>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed pt-5 md:pt-52 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg border shadow-lg">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">SignIn</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                                    <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.email && "p-1 mt-1 px-4"} rounded-md`}>{errors.email?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                    <input {...register('password')} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                                    <p className={`text-sm bg-red-600 opacity-80 text-white ${errors.password && "p-1 mt-1 px-4"}  rounded-md`}>{errors.password?.message}</p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input {...register('remember')} id="remember" type="checkbox" value="" className="w-4 h-4 border focus:outline-none border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                                        </div>
                                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 ">Remember me</label>
                                    </div>
                                    <a onClick={handleResetPassword} href="#" className="text-sm text-blue-700 hover:underline">Forgot Password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                                <div>
                                    <p className='text-center'>or</p>
                                </div>
                                <div className='flex flex-row justify-center items-center space-x-10 -translate-y-2'>
                                    <div className='border border-gray-300 rounded-full p-3 cursor-pointer'>
                                        <FcGoogle size={30} onClick={() => googleLogin()} />
                                    </div>
                                    <div className='border border-gray-300 rounded-full p-2 cursor-pointer'>
                                        <FacebookLogin
                                            appId={REACT_APP_FACEBOOK_APP_ID}
                                            fields="name,email,picture"
                                            callback={handleFacebookLogin}
                                            icon={<FaFacebookSquare size={30} />}
                                            textButton=""
                                            cssClass='h-10 w-10 rounded-full items-center justify-center flex'
                                        />

                                    </div>
                                    <div className='border border-gray-300 rounded-full p-2 cursor-pointer'>
                                        <GithubLogin
                                            clientId={REACT_APP_GITHUB_CLIENT_ID}
                                            redirectUri={REACT_APP_GITHUB_REDIRECT_URI}
                                            onSuccess={handleSuccess}
                                            onFailure={handleFailure}
                                            buttonText={<BsGithub size={30} />}
                                            aria-label=""
                                            className='h-10 w-10 rounded-full items-center justify-center flex'
                                        />

                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-500 ">
                                    Not registered? <a onClick={handleRegister} href="#" className="text-blue-700 hover:underline">Create account</a>
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
    email: '',
    password: '',
    remember: false
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

export default LoginModel