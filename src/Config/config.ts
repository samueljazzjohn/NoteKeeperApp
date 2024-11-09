function getConfig() {
    if (window !== null && window._env_ !== undefined) {
      return {
        REACT_APP_FACEBOOK_APP_ID: window._env_.REACT_APP_FACEBOOK_APP_ID,
        REACT_APP_GRAPHQL_URI: window._env_.REACT_APP_GRAPHQL_URI,
        REACT_APP_GOOGLE_CLIENT_ID: window._env_.REACT_APP_GOOGLE_CLIENT_ID,
        REACT_APP_GOOGLE_CLIENT_SECRET: window._env_.REACT_APP_GOOGLE_CLIENT_SECRET,
        REACT_APP_GITHUB_CLIENT_ID: window._env_.REACT_APP_GITHUB_CLIENT_ID,
        REACT_APP_GITHUB_CLIENT_SECRET: window._env_.REACT_APP_GITHUB_CLIENT_SECRET,
  
      };
    } else {
      return {
        REACT_APP_FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
        REACT_APP_GRAPHQL_URI: process.env.REACT_APP_GRAPHQL_URI,
        REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        REACT_APP_GOOGLE_CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        REACT_APP_GITHUB_CLIENT_ID: process.env.REACT_APP_GITHUB_CLIENT_ID,
        REACT_APP_GITHUB_CLIENT_SECRET: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      };
    }
  }
  export default getConfig;