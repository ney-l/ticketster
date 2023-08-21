import mongoose from 'mongoose';
import { OrderStatus } from '@ticketster/common';
import { type TicketDoc } from './ticket';

/**
 * An interface that describes the properties
 */
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

/**
 * An interface that describes the properties on Order Document
 * when we query a single order
 */
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

/**
 * An interface that describes the properties on Order Model
 */
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, returnedDoc) {
        returnedDoc.id = returnedDoc._id;
        delete returnedDoc._id;
      },
    },
    timestamps: true,
  },
);

/**
 * A helper method to create a new order in a type-safe way
 */
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order, OrderStatus };
