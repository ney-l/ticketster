import { TicketCreatedListener } from '@/events/listeners';
import { natsWrapper } from '@/nats-wrapper';
import { type TicketCreatedEvent } from '@ticketster/common';
import { faker } from '@faker-js/faker';
import { Ticket } from '@/models';
import { buildMockNatsMessage, generateMongoId } from '@/test';

beforeEach(async () => {
  await natsWrapper.connect();
});

afterEach(() => {
  natsWrapper.close();
});

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEvent['data'] = {
    id: generateMongoId(),
    version: 0,
    title: faker.lorem.words(3),
    price: parseInt(faker.commerce.price()),
    userId: generateMongoId(),
  };
  // create a fake message object
  const message = buildMockNatsMessage();

  return { listener, data, message };
};

it('creates and saves a ticket', async () => {
  const { listener, data, message } = await setup();

  // call the `onMessage` function with the data object and message object
  await listener.onMessage(data, message);

  // write assertions to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  const { title, price } = ticket;
  expect(title).toEqual(data.title);
  expect(price).toEqual(data.price);
});

it('acknowledges the message', async () => {
  const { data, listener, message } = await setup();

  // call the `onMessage` function with the data object and message object
  await listener.onMessage(data, message);

  // write assertions to make sure `ack` function was called
  expect(message.ack).toHaveBeenCalled();
  expect(message.ack).toHaveBeenCalledTimes(1);
});
