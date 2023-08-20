/**
 * Queue group name is used to ensure that only one instance of a service
 * processes a message. This is useful when we have multiple instances of
 * a service running at the same time.
 */
export enum QueueGroups {
  OrdersService = 'orders-service',
}
