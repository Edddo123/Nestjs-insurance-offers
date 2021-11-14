import { Offers } from '../../offers/entities/offers.entity';
import { Client } from '../../users/entities/client.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  emergencyCoverage: number;

  @Column()
  plasticSurgery: number;

  @Column()
  dentistCoverage: number;

  @Column()
  duration: number;

  @ManyToOne(() => Client, (client) => client.policy)
  client: Client

  @OneToMany(() => Offers, (offers) => offers.policy)
  offerConnection: Offers[];
}