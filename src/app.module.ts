import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { FilePathEnv } from './types/file-path-env';
import { UsecasesModule } from './usecases/usecases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: FilePathEnv,
    }),
    DatabaseModule,
    RepositoriesModule,
    UsecasesModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
