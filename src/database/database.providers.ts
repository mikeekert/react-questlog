import { MongooseModule } from '@nestjs/mongoose';
import { NestConfigModule } from '../config/nestConfigModule';
import { NestConfigService } from '../config/nestConfigService';

export const databaseProviders =
    MongooseModule.forRootAsync({
        imports: [NestConfigModule],
        inject: [NestConfigService],
        useFactory: async (config: NestConfigService) => ({
            uri: config.get('MONGODB_URI'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
    });
