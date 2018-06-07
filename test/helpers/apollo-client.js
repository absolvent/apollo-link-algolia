import AlgoliaLink from '../../src/index';
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http';
const algoliasearch = require('algoliasearch');
const fetch = require('isomorphic-fetch');
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

require('dotenv').config();

const algoliaClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);
const cache = new InMemoryCache();

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const algoliaLink = new AlgoliaLink({
  client: algoliaClient
});

const httpLink = new HttpLink({
  uri: 'https://api.example.com/graphql'
});

const config = {
  link: ApolloLink.from([algoliaLink, httpLink]),
  cache
};

export default new ApolloClient(config);
