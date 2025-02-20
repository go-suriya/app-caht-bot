import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [UsecasesModule, RepositoriesModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
