import { Entity, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  role: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
