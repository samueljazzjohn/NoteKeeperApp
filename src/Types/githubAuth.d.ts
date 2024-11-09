export interface UseGithubOAuthProps {
    setLoggedIn: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    handleClose: () => void;
    navigate: (path: string) => void;
  }
  
 export interface GitHubUserInfo {
    email: string;
    avatar_url: string; 
    login: string;
    name: string | null;
  }