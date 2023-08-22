import { type TicketUpdatedEvent } from '@ticketster/common';
import { TicketUpdatedListener } from '@/events/listeners';
import { natsWrapper } from '@/nats-wrapper';
import { buildMockNatsMessage, buildTicket, generateMongoId } from '@/test';
import { faker } from '@faker-js/faker';
import { Ticket } from '@/models';

beforeEach(async () => {
  await natsWrapper.connect();
});
afterEach(() => {
  natsWrapper.close();
});

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = await buildTicket();

  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: faker.lorem.words(3),
    price: parseInt(faker.commerce.price()),
    userId: generateMongoId(),
  };
  // create a fake message object
  const message = buildMockNatsMessage();

  return { listener, data, message, ticket };
};

it('finds, updates, and saves a ticket', async () => {
  const { message, data, listener, ticket } = await setup();

  await listener.onMessage(data, message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('acknowledges the message', async () => {
  const { message, data, listener } = await setup();

  await listener.onMessage(data, message);

  expect(message.ack).toHaveBeenCalled();
  expect(message.ack).toHaveBeenCalledTimes(1);
});
