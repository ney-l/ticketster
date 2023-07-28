class NatsWrapper {
  readonly client;

  constructor() {
    this.client = {
      publish: jest
        .fn()
        .mockImplementation(
          (subject: string, data: string, callback: () => void) => {
            callback();
          },
        ),
    };
  }
}

export const natsWrapper = new NatsWrapper();
