import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover } from 'react-tiny-popover';
import { useMutation } from '@apollo/client'
import { LOGIN_USER, GOOGLE_LOGIN, FACEBOOK_LOGIN } from '../../mutations/userMutations';
import { toast } from 'react-hot-toast';
import FacebookLogin from 'react-facebook-login';
import GithubLogin from 'react-github-login';
import { FaFacebookSquare } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


const LoginModel = ({ setLoginModel, setLoggedIn, setRegistrationModel,setForgetModel }) => {

    const navigate =useNavigate()

    const [loginUser] = useMutation(LOGIN_USER);
    const [loginGoogle] = useMutation(GOOGLE_LOGIN);
    const [loginFacebook] = useMutation(FACEBOOK_LOGIN);

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
            console.log(res.data.login)
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

    const googleLogin = useGoogleLogin({
        onSuccess: response => {
            fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${response.access_token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    loginGoogle({ variables: { email: data.email, username: data.given_name } }).then((res) => {
                        console.log(res.data.loginGoogle)
                        toast.success('Login Successful')
                        localStorage.setItem('token', res.data.loginGoogle.token)
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('user', res.data.loginGoogle.user.username)
                        navigate(`/home`)
                        setLoggedIn(true)
                        handleClose()
                    }).catch((err) => {
                        console.log(err.message)
                        toast.error('Login Failed')
                    })

                })
                .catch(error => {
                    console.error(error.message);
                });
        },
        onFailure: response => console.log(response),
        clientId: 'GOOGLE_CLIENT_ID',
        // ...other props
    });

    const handleFacebookLogin = (response) => {
        loginFacebook({ variables: { email: response.email, username: response.name } }).then((res) => {
            console.log(res.data.loginFacebook)
            toast.success('Login Successful')
            localStorage.setItem('user', res.data.login.user.username)
            localStorage.setItem('token', res.data.loginFacebook.token)
            localStorage.setItem('isLoggedIn', true)
            setLoggedIn(true)
            handleClose()
        }).catch((err) => {
            console.log(err.message)
            toast.error('Login Failed')
        })
    };

    const handleGithubLogin = (response) => {
        if (response.error == 'The popup was closed') {
            toast.error('Login Failed')
        } else {
            // Handle Github sign-in
            fetch("https://github.com/login/oauth/access_token", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    client_id: "6c74ad4eebe76f8e5549",
                    client_secret: "a7016c963d6c53cc52f572fd9b541fd707c24af0",
                    code: response.code,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const access_token = data.access_token;
                    fetch("https://api.github.com/user", {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            // handle user data
                        });
                });
        }

    };
    return (
        <>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed pt-5 md:pt-52 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg border shadow-lg">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-bold text-gray-900 text-center ">SignIn</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                                    <p className={`text-sm bg-red-600 text-white opacity-80 ${errors.email && "p-1 mt-1 px-4"} rounded-md`}>{errors.email?.message}</p>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                    <input {...register('password')} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                                    <p className={`text-sm bg-red-600 opacity-80 text-white ${errors.password && "p-1 mt-1 px-4"}  rounded-md`}>{errors.password?.message}</p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input {...register('remember')} id="remember" type="checkbox" value="" className="w-4 h-4 border focus:outline-none border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                                        </div>
                                        <label for="remember" className="ml-2 text-sm font-medium text-gray-900 ">Remember me</label>
                                    </div>
                                    <a onClick={handleResetPassword} href="#" className="text-sm text-blue-700 hover:underline">Forgot Password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                                <div>
                                    <p className='text-center'>or</p>
                                </div>
                                <div className='flex flex-row justify-center items-center space-x-10 -translate-y-2'>
                                    <div className='border border-gray-300 rounded-full p-3'>
                                        <FcGoogle size={30} onClick={() => googleLogin()} />
                                    </div>
                                    <div className='border border-gray-300 rounded-full p-2'>
                                        <FacebookLogin
                                            appId="786061892882373"
                                            fields="name,email,picture"
                                            callback={handleFacebookLogin}
                                            icon={<FaFacebookSquare size={30} />}
                                            textButton=""
                                            cssClass='h-10 w-10 rounded-full items-center justify-center flex'
                                        />

                                    </div>
                                    <div className='border border-gray-300 rounded-full p-2'>
                                        <GithubLogin
                                            clientId="6c74ad4eebe76f8e5549"
                                            redirectUri="http://localhost:3000"
                                            onSuccess={handleGithubLogin}
                                            onFailure={handleGithubLogin}
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