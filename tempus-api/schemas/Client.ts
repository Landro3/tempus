import { model, ObjectId, Schema, Types } from 'mongoose';

interface IClient {
  userId: ObjectId;
  name: string;
  active: boolean;
  color: string; // hex color
}

const clientSchema = new Schema<IClient>({
  userId: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  color: { type: String, required: true }
});

export const Client = model<IClient>('Client', clientSchema);
