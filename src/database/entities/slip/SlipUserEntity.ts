import * as dotenv from 'dotenv';
import { FilePathEnv } from 'src/types/file-path-env';
import { Column, Entity, Index } from 'typeorm';
import { DefaultEntity } from '../default.entity';

dotenv.config({ path: FilePathEnv });

@Entity({
  name: 'slip_user',
  database: process.env.POSTGRES_DATABASE,
})
export class SlipUserEntity extends DefaultEntity {
  @Column({ name: 'line_user_id' })
  @Index()
  line_user_id: string;

  @Column({ name: 'display_name' })
  display_name: string;
}
