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


### BUSMQ_HTTP_GET_API

Specify the URL to use when retrieving the BusMQ configuration.


#### ENTITY_HTTP_GET_API and ENTITY_HTTP_POST_API

Specify URLs for the HTTP APIs used to manage entities.


#### EVENTS_HTTP_GET_API and EVENT_HTTP_POST_API

Specify a URL for the HTTP APIs used to retrieve and trigger events.


#### PDF_HTTP_GET_API

Specify a URL for the HTTP APIs used to generate PDF reports.


#### SUBSCRIBE_HTTP_POST_API

Specify a URL for the HTTP APIs used to manage subscriptions.


## Related Links

- https://github.com/davezuko/react-redux-starter-kit
