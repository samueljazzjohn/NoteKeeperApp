export interface UseGoogleOAuthProps {
    setLoggedIn: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    handleClose: () => void;
    navigate: (path: string) => void;
  }
  
 export interface GoogleUserInfo {
    email: string;
    given_name: string;
  }