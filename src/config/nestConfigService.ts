import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class NestConfigService {
    MONGODB_URI: string;
    private readonly envConfig: { [key: string]: string };

    constructor() {
        if (
            process.env.NODE_ENV === 'production'
        ) {
            this.envConfig = {
                MONGODB_URI: process.env.MONGODB_URI,
                AUTH0_API_KEY: process.env.AUTH0_API_KEY,
                AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
                AUTH0_SECRET: process.env.AUTH0_SECRET
            };
        } else {
            this.envConfig = dotenv.parse(fs.readFileSync('.env'));
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
