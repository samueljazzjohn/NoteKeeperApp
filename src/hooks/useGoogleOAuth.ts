import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { GOOGLE_LOGIN } from '../Services/Mutations/userMutations';
import { GoogleUserInfo, UseGoogleOAuthProps } from '../Types/googleAutth';



export const useGoogleOAuth = ({ setLoggedIn, setLoading, handleClose, navigate }: UseGoogleOAuthProps) => {
  const [loginGoogle] = useMutation(GOOGLE_LOGIN);

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: (response: TokenResponse) => {
      setLoading(true);
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data: GoogleUserInfo) => {
          loginGoogle({ variables: { email: data.email, username: data.given_name } })
            .then((res) => {
              console.log(res.data.loginGoogle);
              toast.success('Login Successful');
              localStorage.setItem('token', res.data.loginGoogle.token);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('user', res.data.loginGoogle.user.username);
              setLoading(false);
              navigate('/home');
              setLoggedIn(true);
              handleClose();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.message);
              toast.error('Login Failed');
            });
        })
        .catch((err) => {
          setLoading(false);
          console.error(err.message);
          toast.error('Failed to fetch Google user info');
        });
    },
  });  

  return { googleLogin };
};
