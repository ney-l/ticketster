import { Ticket } from '@/models';

it('implements optimistic concurrency control', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const instanceOne = await Ticket.findById(ticket.id);
  const instanceTwo = await Ticket.findById(ticket.id);

  if (!instanceOne || !instanceTwo) {
    throw new Error('Unexpected Error: Ticket not found');
  }

  // Make two seperate changes to the tickets we fetched
  instanceOne.set({ price: 10 });
  instanceTwo.set({ price: 15 });

  // save the first fetched ticket and expect it to work
  await instanceOne.save();

  // try to save the second fetched ticket and expect an error
  try {
    await instanceTwo.save();
  } catch (err) {
    expect(err).toBeDefined();
    return;
  }

  throw new Error(
    'Unexpected error: An error should have been thrown and this line should not have been executed',
  );
});

it('increments the version number on each save', async () => {
  // create ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  // save ticket
  await ticket.save();

  // expect version to be 0
  expect(ticket.version).toBe(0);

  // save ticket again
  await ticket.save();

  // expect version to be 1
  expect(ticket.version).toBe(1);

  // save ticket again
  await ticket.save();

  // expect version to be 2
  expect(ticket.version).toBe(2);
});
