import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { Photo } from './photo';

@ChildEntity()
export class Client extends User {
  @Column()
  avatar: string;

  @Column()
  fullName: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
