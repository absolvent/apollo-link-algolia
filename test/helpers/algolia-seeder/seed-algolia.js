/**
 * Algolia test data seeder
 */
require('dotenv').config();
const algoliasearch = require('algoliasearch');
const contactsIndexName = `${process.env.ALGOLIA_INDEX_PREFIX ? process.env.ALGOLIA_INDEX_PREFIX + '_' : ''}test_contacts`;

console.log(`Your Algolia Application Id: ${process.env.ALGOLIA_APPLICATION_ID}`);
console.log(`Your Algolia API Key: ${process.env.ALGOLIA_API_KEY}`);

console.log(`\nSeeding index: ${contactsIndexName}...`);

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);
const contactsIndex = client.initIndex(contactsIndexName);
const contactsJson = require('./data/contacts.json');

let existingContactsIndex = null;

client.listIndexes(function(err, content) {
  if (err) throw err;
  content.items.forEach(index => {
    if (index.name === contactsIndexName) {
      existingContactsIndex = index;
    }
  });

  if (existingContactsIndex) {
    console.log(`Index: ${existingContactsIndex.name} already exists.`);

    if (process.env.ALGOLIA_DELETE_EXISTING_INDEXES && process.env.ALGOLIA_DELETE_EXISTING_INDEXES.toString().toLowerCase() === 'true') {
      console.log(`ALGOLIA_DELETE_EXISTING_INDEXES is Enabled. Deleting index: ${existingContactsIndex.name}`);
      client.deleteIndex(existingContactsIndex.name, function(err) {
        if (err) throw err;
        console.log(`Index: ${existingContactsIndex.name} successfully deleted`);
      });
    } else {
      console.log(`ALGOLIA_DELETE_EXISTING_INDEXES is not enabled - set ALGOLIA_DELETE_EXISTING_INDEXES=true to reseed this index`);
      console.log(`Exiting...`);
      process.exit(0);
    }
  }

  contactsIndex.addObjects(contactsJson, function(err) {
    if (err) throw err;
    console.log(`Index: ${contactsIndexName} successfully seeded`);
  });

});
