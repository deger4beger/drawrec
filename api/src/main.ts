import "dotenv/config"
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {Logger} from '@nestjs/common';
import {ValidationPipe} from './shared/validation.pipe';
import {AuthGuard} from './shared/auth.guard';
import {NODE_PORT} from '../config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true})
  await app.listen(NODE_PORT)
  // app.setGlobalPrefix('api/v1') // Not working, wtf ???
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthGuard())
  Logger.log(`Server is up and running on http://localhost:${NODE_PORT}`, "Bootstrap")
}

bootstrap()
