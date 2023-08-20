import { type Message } from 'node-nats-streaming';
import {
  Subjects,
  BaseListener,
  type TicketCreatedEvent,
} from '@ticketster/common';
import { Ticket } from '@/models';
import { QueueGroups } from './query-group-name';

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  /**
   * The subject that this listener will listen for.
   */
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  /**
   * Queue group name is used to ensure that only one instance of a service
   * processes a message. This is useful when we have multiple instances of
   * a service running at the same time.
   */
  queueGroupName = QueueGroups.OrdersService;

  /**
   * onMessage() is the function that will be executed when a message is
   * received. After receiving the message, we create a ticket in the
   * orders database. We also acknowledge the message to NATS Streaming
   * Server.
   */
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
