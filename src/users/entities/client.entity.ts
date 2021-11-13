import { Policy } from 'src/policy/entities/policy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Policy, (policy) => policy.client)
  policy: Policy
}

// @PrimaryGeneratedColumn("uuid")
// id: string;


// @Column() - if needed just uuid value
// @Generated("uuid")
// uuid: string;
