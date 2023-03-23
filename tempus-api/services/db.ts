import mongoose, { connect } from 'mongoose';

mongoose.set('strictQuery', false);
export const connectDb = async () => connect('mongodb://127.0.0.1/tempus');
