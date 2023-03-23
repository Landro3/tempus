import serverless from 'serverless-http';
import express, { Response } from 'express';
import { ObjectId, Types } from 'mongoose';
import dayjs from 'dayjs';

import { connectDb } from '../services/db';

import { TimeEntry } from '../schemas/TimeEntry';
import { Client } from '../schemas/Client';

const app = express();
connectDb();

app.get('/time', async (_, res: Response) => {
  // Time range query

  const time = await TimeEntry.find();

  const entriesPerDay = {};
  for (const entry of time) {
    if (!entriesPerDay[entry.date]) {
      entriesPerDay[entry.date] = [];
    }

    entriesPerDay[entry.date].push(entry);
  }

  res.status(200).json(entriesPerDay);
});

app.post('/time', async (_, res: Response) => {
  // Post 1000 transactions for 5 clients
  console.log('inserting clients and time');
  const userId = new Types.ObjectId();
  const minDate = dayjs().subtract(3, 'month').unix();
  const maxDate = dayjs().unix();

  const clientIds: ObjectId[] = [];
  const names = ['Facebook', 'Apple', 'Amazon', 'Netflix', 'Google'];
  const colors = ['#3b5998', '#66b447', '#FF9900', '#E50914', '#f4c20d'];
  for (let i = 0; i < 5; i++) {
    const result = await Client.create({
      userId,
      name: names[i],
      active: true,
      color: colors[i]
    });

    clientIds.push(result.id);
  }

  for (let i = 0; i < 1000; i++) {
    const rand = Math.floor(Math.random() * 5);
    const clientId = clientIds[rand];
    const client = names[rand];

    const time = (Math.random() * 8).toFixed(1);
    const date = dayjs.unix(Math.floor(Math.random() * (maxDate - minDate) + minDate)).format('MM/DD/YYYY');
    await TimeEntry.create({
      userId,
      clientId,
      date,
      description: `Charged ${time} hours to ${client}`,
      length: time
    });
  }

  res.status(200).send({ message: 'Success!' });
});

module.exports.handler = serverless(app);
