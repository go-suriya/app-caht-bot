import { Module } from '@nestjs/common';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [UsecasesModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
