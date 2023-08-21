import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
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
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, returnedDoc) {
        returnedDoc.id = returnedDoc._id;
        delete returnedDoc.__v;
        delete returnedDoc._id;
      },
    },
    timestamps: true,
  },
);

/**
 * Rename __v to version
 */
ticketSchema.set('versionKey', 'version');
/**
 * This plugin is used to update the version number of a document when it is
 * updated. This is useful when we want to use optimistic concurrency control
 * to prevent multiple users from updating the same document at the same time.
 */
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
