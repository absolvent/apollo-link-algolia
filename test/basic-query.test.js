require('dotenv').config();
import client from './helpers/apollo-client';
import gql from 'graphql-tag';

const contactsIndexName = `${process.env.ALGOLIA_INDEX_PREFIX ? process.env.ALGOLIA_INDEX_PREFIX + '_' : ''}test_contacts`;
const contactsQuery = gql`
  query ContactsQuery {
    contacts @algolia(index: ${contactsIndexName})
  }
`;


describe('Algolia Basic Queries', () => {

  describe('Contacts queries', () => {
    it('Get response with 20 contacts ', () => {
      client.query({ query: contactsQuery })
      .then(({ data }) => {
        const { contacts } = data;
        expect(data).toBeDefined();
        expect(contacts.length).toBe(20);
      })
      .catch(error => console.error(error));
    });
  })
});
