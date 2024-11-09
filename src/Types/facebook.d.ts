export interface FacebookResponse {
    email: string;
    name: string;
  }
  
 export interface UseFacebookLoginProps {
    setLoggedIn: (value: boolean) => void;
    handleClose: () => void;
  }
  