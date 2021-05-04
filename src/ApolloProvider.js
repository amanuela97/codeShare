import React from 'react';
import App from './App.js';
import { ApolloProvider as ApolloHooksProvider, InMemoryCache, ApolloClient} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
/*import { WebSocketLink } from "@apollo/client/link/ws";

const socketLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
    },
});*/

const httpLink = createUploadLink({
    uri: 'https://env-3746005.jelastic.metropolia.fi/graphql'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //@ts-ignore
    cache: new InMemoryCache(),
});


export default (
    <ApolloHooksProvider client={client}>
        <App/>
    </ApolloHooksProvider>
  
);