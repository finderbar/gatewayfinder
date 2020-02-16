import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema } from './graphql';

const WS_GQL_PATH = '/subscriptions';
const GQL_PATH = '/graphql'
const GRAPHQL_PORT = '4000';
const wsGqlURL = process.env.NODE_ENV !== 'production' ? `ws://localhost:${GRAPHQL_PORT}${WS_GQL_PATH}` : `ws://188.59.208.23:${GRAPHQL_PORT}${WS_GQL_PATH}`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', cors());

app.use(GQL_PATH,
  bodyParser.json(),
  graphqlExpress((req) => ({
    schema: schema, //
    context: req.context,
    pretty: true,
    graphiql: true,
    tracing: true,
    cacheControl: true,
    formatError: err => {
      if (err.originalError && err.originalError.error_message) {
        err.message = err.originalError.error_message;
      }
      return err;
    }
  }))
);

app.use('/playground', graphiqlExpress({
  endpointURL: GQL_PATH,
  subscriptionsEndpoint: wsGqlURL
}));

// create server with websocket
const server = createServer(app);

server.listen(GRAPHQL_PORT, () => {
  new SubscriptionServer({ schema, execute, subscribe }, { server: server, path: WS_GQL_PATH });
  console.log('Express GraphQL Server Now Running On localhost:4000/playground')
});
