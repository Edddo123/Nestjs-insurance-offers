import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

// @PrimaryGeneratedColumn("uuid")
// id: string;


// @Column() - if needed just uuid value
// @Generated("uuid")
// uuid: string;
