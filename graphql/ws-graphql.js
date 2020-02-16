import { PubSub, withFilter } from 'graphql-subscriptions';
export const pubsub = new PubSub();

export const wsGraphqlSubscription = {
  notifications: { subscribe: () => pubsub.asyncIterator('NOTIFICATIONS') },
}
