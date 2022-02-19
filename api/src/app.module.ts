import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/httpError.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } from '../config/config';

// Settings for heroku & local

// const dbSettings = process.env.DATABASE_URL ?
//     {
//         type: 'postgres',
//         url: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         entities: ["dist/**/*.entity{.ts,.js}"],
//         synchronize: true,
//     } : {
//         type: 'postgres',
//         host: PG_HOST,
//         port: Number(PG_PORT),
//         username: PG_USERNAME,
//         password: PG_PASSWORD,
//         database: PG_DB,
//         entities: ["dist/**/*.entity{.ts,.js}"],
//         synchronize: true,
//     }

// Settings for docker & local

const dbSettings = {
        type: 'postgres',
        host: PG_HOST,
        port: Number(PG_PORT),
        username: PG_USERNAME,
        password: PG_PASSWORD,
        database: PG_DB,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
    }

@Module({
    imports: [
        TypeOrmModule.forRoot(dbSettings as any),
        UserModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]
})
export class AppModule {}
