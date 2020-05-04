import { Module } from '@nestjs/common';
import { NestConfigService } from './nestConfigService';

@Module({
    providers: [NestConfigService],
    exports: [NestConfigService],
})
export class NestConfigModule {
}
