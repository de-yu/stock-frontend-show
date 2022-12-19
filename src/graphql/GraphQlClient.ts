import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { ApolloLink } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient, InMemoryCache, createHttpLink,
} from '@apollo/client';

const cache = new InMemoryCache();

const link: any = ApolloLink.from([
  createPersistedQueryLink({ useGETForHashedQueries: true }),
  createHttpLink({ uri: process.env.VUE_APP_API }) as any,
]);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const GraphClient = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

export default GraphClient;
