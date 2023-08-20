import {
  Publisher,
  type OrderCreatedEvent,
  Subjects,
} from '@ticketster/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
