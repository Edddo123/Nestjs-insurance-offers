import { Offers } from 'src/offers/entities/offers.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Insurer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Offers, (offers) => offers.policy)
  offerConnection: Offers[];
}




