import { Controller, Get } from '@nestjs/common';
import { PocketBaseRepositoryService } from './repositories/pocket-base-repository/pocket-base-repository.service';
import { PocketBaseCollectionName } from './types/pocketbase-collection.enum';

@Controller()
export class AppController {
  constructor(
    private readonly pocketBaseRepositoryService: PocketBaseRepositoryService,
  ) {}

  @Get('/users')
  async getAllUsers() {
    await this.pocketBaseRepositoryService.authenticate();
    return await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.Users)
      .getFullList();
  }
}
