import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from './client';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Client, (user) => user.photos)
  user: Client

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
