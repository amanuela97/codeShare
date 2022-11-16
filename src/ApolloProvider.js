import React from 'react'
import App from './App.js'
import {
  ApolloProvider as ApolloHooksProvider,
  InMemoryCache,
  ApolloClient,
} from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
  uri: 'https://code-share-apollo-server.herokuapp.com/graphql',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //@ts-ignore
  cache: new InMemoryCache(),
})

export default (
  <ApolloHooksProvider client={client}>
    <App />
  </ApolloHooksProvider>
)
