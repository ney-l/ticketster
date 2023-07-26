import {
  Publisher,
  Subjects,
  type TicketUpdatedEvent,
} from '@ticketster/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
