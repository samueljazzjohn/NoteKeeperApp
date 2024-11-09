import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { GITHUB_LOGIN } from '../Services/Mutations/userMutations'; // Make sure you have the mutation for GitHub login
import { GitHubUserInfo, UseGithubOAuthProps } from '../Types/githubAuth';

export const useGithubLogin = ({ setLoggedIn, setLoading, handleClose, navigate }: UseGithubOAuthProps) => {
  const [loginGithub] = useMutation(GITHUB_LOGIN);
  const [error, setError] = useState<string | null>(null);

  const handleGithubLogin = async (code: string) => {
    if (!code) {
      setError('Authorization code is missing');
      return;
    }

    setLoading(true);

    try {
      // Fetch the access token and user data from your backend
      const response = await fetch(`http://api.notekeeper.localhost/v1/auth/github/callback?code=${code}`);
      const data: GitHubUserInfo = await response.json();

      if ('error' in data) {
        setLoading(false);
        toast.error('Login failed');
        return;
      }

      // Call the backend to handle login with the GitHub user data
      loginGithub({
        variables: {
          email: data.email,
          username: data.login,
        },
      })
        .then((res) => {
          console.log(res.data.loginGithub);
          toast.success('Login Successful');
          localStorage.setItem('token', res.data.loginGithub.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', res.data.loginGithub.user.username);
          setLoading(false);
          navigate('/home');
          setLoggedIn(true);
          handleClose();
        })
        .catch((err) => {
          setLoading(false);
          console.error(err.message);
          toast.error('Login Failed');
        });
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      toast.error('Failed to fetch GitHub user info');
    }
  };

  return { handleGithubLogin, error };
};
