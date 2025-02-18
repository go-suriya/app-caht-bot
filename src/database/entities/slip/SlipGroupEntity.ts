import * as dotenv from 'dotenv';
import { FilePathEnv } from 'src/types/file-path-env';
import { TypeGroup } from 'src/types/type-group.enum';
import { Column, Entity, Index } from 'typeorm';
import { DefaultEntity } from '../default.entity';

dotenv.config({ path: FilePathEnv });

@Entity({
  name: 'slip_group',
  database: process.env.POSTGRES_DATABASE,
})
export class SlipGroupEntity extends DefaultEntity {
  @Column({ name: 'line_group_id' })
  @Index()
  line_group_id: string;

  @Column({ name: 'group_name', nullable: true })
  group_name: string;

  @Column({ name: 'type', enum: TypeGroup })
  type: TypeGroup;
}
