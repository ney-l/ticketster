import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

/**
 * ! Only contains those attributes of Ticket that the Orders Service cares about
 */
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
  version: number;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, returnedDoc) {
        returnedDoc.id = returnedDoc._id;
        delete returnedDoc._id;
      },
    },
  },
);

/**
 * Rename the __v field to version
 */
ticketSchema.set('versionKey', 'version');

/**
 * ! This is a plugin that will automatically increment the version number
 * ! of a document every time it is updated. This is useful for optimistic
 * ! concurrency control.
 */
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

/**
 * Run query to look at all orders. Find an order where the ticket
 * is the ticket we just found *and* the orders status is *not* cancelled.
 * If we find an order from that means the ticket *is* reserved.
 */
ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket, type TicketDoc };
