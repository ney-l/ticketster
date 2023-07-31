import {
  Subjects,
  Publisher,
  type OrderCancelledEvent,
} from '@ticketster/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
