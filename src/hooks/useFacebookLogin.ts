import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { FACEBOOK_LOGIN } from '../Services/Mutations/userMutations';
import { FacebookResponse, UseFacebookLoginProps } from '../Types/facebook';


export const useFacebookLogin = ({ setLoggedIn, handleClose }: UseFacebookLoginProps) => {
  const [loginFacebook] = useMutation(FACEBOOK_LOGIN);

  const handleFacebookLogin = (response: FacebookResponse) => {
    loginFacebook({ variables: { email: response.email, username: response.name } })
      .then((res) => {
        console.log(res.data.loginFacebook);
        toast.success('Login Successful');
        localStorage.setItem('user', res.data.loginFacebook.user.username);
        localStorage.setItem('token', res.data.loginFacebook.token);
        localStorage.setItem('isLoggedIn', 'true');
        setLoggedIn(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('Login Failed');
      });
  };

  return { handleFacebookLogin };
};
