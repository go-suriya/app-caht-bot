import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        username: configService.get<string>('POSTGRES_USER'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
        autoLoadEntities: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
