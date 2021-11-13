import { Client } from 'src/users/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}