import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./Pages/HomePage/App"
import './index.css'
import { ApolloClient, InMemoryCache,ApolloProvider,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import getConfig from './Config/config';

const {REACT_APP_GRAPHQL_URI, REACT_APP_GOOGLE_CLIENT_ID } = getConfig()

const httpLink = createHttpLink({
  uri: REACT_APP_GRAPHQL_URI
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
  <ApolloProvider client={client}>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>
  </ApolloProvider>
  </GoogleOAuthProvider>
)