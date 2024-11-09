export {};

declare global {
    interface Window {
      _env_: {
        REACT_APP_FACEBOOK_APP_ID: string;
        REACT_APP_GRAPHQL_URI: string;
        REACT_APP_GOOGLE_CLIENT_ID: string;
        REACT_APP_GOOGLE_CLIENT_SECRET: string;
        REACT_APP_GITHUB_CLIENT_ID: string;
        REACT_APP_GITHUB_CLIENT_SECRET: string;
        REACT_APP_GITHUB_REDIRECT_URI: string;
      };
    }
  }