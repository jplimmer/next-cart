import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://api.escuelajs.co/graphql',
});

// Apollo Client setup
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
