import serverless from 'serverless-http';
import express, { Response } from 'express';

import { connectDb } from '../services/db';

import { Client } from '../schemas/Client';

const app = express();
connectDb();

app.get('/clients', async (_, res: Response) => {
  const clients = await Client.find();

  res.status(200).json(clients);
});

app.post('clients', async (req: any, res: Response) => {
  const test = await Client.validate(req.body);

  console.log(test);

  res.status(200).send();
});

app.patch('/clients/:id', async (req: any, res: Response) => {
  const clientId = req.params.id;
  const data = JSON.parse(req.apiGateway.event.body);

  console.log(data);

  await Client.findByIdAndUpdate(clientId, data);

  res.status(200).send();
});

module.exports.handler = serverless(app);
