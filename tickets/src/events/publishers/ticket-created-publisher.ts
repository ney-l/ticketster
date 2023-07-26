import {
  Publisher,
  Subjects,
  type TicketCreatedEvent,
} from '@ticketster/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
