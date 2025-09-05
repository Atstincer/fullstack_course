import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'

const authLink = new SetContextLink((_, { headers }) => {
  const token = localStorage.getItem('login_user_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
)
