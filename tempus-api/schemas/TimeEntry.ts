import dayjs from 'dayjs';
import { model, ObjectId, Schema, Types } from 'mongoose';

interface ITimeEntry {
  userId: ObjectId;
  clientId: ObjectId;
  date: string;
  description: string;
  length: number;
}

const timeEntrySchema = new Schema<ITimeEntry>({
  userId: { type: Types.ObjectId, required: true },
  clientId: { type: Types.ObjectId, required: true },
  date: {
    type: String,
    required: true,
    validate: {
      validator: (val) => dayjs(val, 'MM/DD/YYYY', true).isValid()
    }
  },
  description: { type: String, required: true },
  length: { type: Number, required: true }
});

export const TimeEntry = model<ITimeEntry>('TimeEntry', timeEntrySchema, 'time_entries');
