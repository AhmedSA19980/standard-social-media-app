/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css'
import { AppProps} from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useApollo } from '../../lib/apolloClient';
const url = "http:localhost:4000/graphql"
const io = "https://48p1r2roz4.sse.codesandbox.io"

const client = new ApolloClient({
  uri: "http:localhost:4000/graphql",
  cache: new InMemoryCache(),
});


function MyApp( {Component, pageProps }:AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
