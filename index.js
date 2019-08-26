import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema } from './server';

const WS_GQL_PATH = '/subscriptions';
const GRAPHQL_PORT = '4000';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', cors());

app.use('/graphql',
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
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'wsGqlURL'
}));

// create server with websocket
const wss = createServer(app);

wss.listen(GRAPHQL_PORT, () => {
  new SubscriptionServer({ schema, execute, subscribe }, { server: wss, path: WS_GQL_PATH });
});