import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, default: 'SYSTEM' })
  @Index()
  created_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: 'SYSTEM' })
  @Index()
  updated_by: string;

  @DeleteDateColumn()
  deleted_at: Date;
}
