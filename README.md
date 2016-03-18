# things-mgr

frontend for a things web service, to query and manage things


## Configuration


### Environment Variables


Put these in a `.env` file in the project root for convenience.

See: https://www.npmjs.com/package/better-npm-run


### USE_CASE

Specify the scenario so build process tailors the output:

- **app**: login, subscription

- **manager**: all screens


#### ENTITY_HTTP_GET_API and ENTITY_HTTP_POST_API

Specify a URLs for the HTTP APIs used to manage entities.


#### SUBSCRIBE_HTTP_POST_API

Specify a URL for the HTTP APIs used to manage subscriptions.


## Related Links

- https://github.com/davezuko/react-redux-starter-kit
