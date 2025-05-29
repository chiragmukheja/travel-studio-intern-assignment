import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  return server(req, res);
}
