import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./pages/App"
import './index.css'
import { ApolloClient, InMemoryCache,ApolloProvider,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RouterProvider } from 'react-router-dom'
import routes from './routes'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
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

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <GoogleOAuthProvider clientId='110291498666-7oq1hes91n5r5sggu2ab9rt54lrrkb5r.apps.googleusercontent.com'>
  <ApolloProvider client={client}>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>
  </ApolloProvider>
  </GoogleOAuthProvider>
)