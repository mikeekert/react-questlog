import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    const port = process.env.PORT;
    await app.listen(port || 5000);
}

bootstrap().then((r) => r);
