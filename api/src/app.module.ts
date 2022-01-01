import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/httpError.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } from '../config/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: PG_HOST,
            port: Number(PG_PORT),
            username: PG_USERNAME,
            password: PG_PASSWORD,
            database: PG_DB,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
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
