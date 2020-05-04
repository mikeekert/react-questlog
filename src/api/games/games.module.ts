import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesSchema } from '../../models/games.dto';
import { GamesService } from '../../services/games.service';
import { GamesController } from './games.controller';

@Module({
    imports: [
        HttpModule,
        CacheModule.register(),
        MongooseModule.forFeature([{
            name: 'Games',
            schema: GamesSchema,
            collection: 'games',
        }]),
    ],
    controllers: [
        GamesController
    ],
    providers: [
        GamesService,
    ],
    exports: [
        GamesService
    ]
})
export class GamesModule {
}
