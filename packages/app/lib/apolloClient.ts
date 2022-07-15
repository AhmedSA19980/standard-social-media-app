"http://localhost:4000/graphql"


import { useMemo } from "react";
import { ApolloClient,createHttpLink, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

import{ApolloLink , Observable} from "apollo-link"
import { request } from "http";
import { getAccessToken } from "../src/utils/accessToken";
import { setContext}  from '@apollo/client/link/context';
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";



const httpLink = createHttpLink({
      
     // uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
     uri:"https://countries.trevorblades.com", 
     credentials: "include", // Additional fetch() options like `credentials` or `headers`
      
    })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  if(token){
  return {
    headers: {
      ...headers,
      authorization:  `Bearer ${token}` 
    },
  };
 }
});
let apolloClient: ApolloClient<NormalizedCacheObject>;



export  function createApolloClient() {
  return new ApolloClient({
  ssrMode: typeof window === "undefined",
    link:authLink.concat(httpLink) ,
  
  
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            me: {
              keyArgs: [],
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: null | undefined) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}