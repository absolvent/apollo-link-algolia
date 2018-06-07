
## apollo-link-algolia
apollo-link-algolia provides you a simple way to query Algolia in graphQL with [Apollo-client](https://www.apollographql.com/client/) **without building a graphQL server**

### Example
```js
const LOCATIONS_QUERY = gql`
  query LocationsQuery {
    locationsInRadius @algolia(index: "dev_LOCATIONS")
  }
`
```

### Building project:
```bash
$ npm run build
```
This will transpile source files into ES and CommonJS versions - should be done during release and
es and lib folders should be versioned.

## Project development / testing:

1. Copy `.env.example` to `.env`

2. Setup environment variables with your Algolia's AppId and ApiKey

### Seed algolia for testing
```bash
$ npm run seed-algolia
```
This will connect to algolia and create an index *test_contacts* if it does not exists.

If you want to re-seed your index you can set *ALGOLIA_DELETE_EXISTING_INDEXES=true* in *.env* file.
This will delete index if it's already in your Algolia app.

### Testing
```bash
$ npm run tests
```
This will run JEST tests located in ./test directory


# This is heavily work in progress!

