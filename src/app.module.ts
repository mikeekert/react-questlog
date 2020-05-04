import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GamesModule } from './api/games/games.module';
import { databaseProviders } from './database/database.providers';
import { checkJwt } from './middleware/jwt.middleware';

@Module({
    imports: [
        HttpModule,
        databaseProviders,
        GamesModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../client/build'),
        })],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(checkJwt)
            .forRoutes('games')
    }
}
