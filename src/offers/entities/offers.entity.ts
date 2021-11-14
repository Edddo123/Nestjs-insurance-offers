import { Policy } from '../../policy/entities/policy.entity';
import { Insurer } from '../../users/entities/insurer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Offers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  policyId: string;

  @PrimaryColumn()
  insurerId: string;

  @Column()
  offeredCoverage: number;

  @Column()
  fee: number;

  @ManyToOne(() => Policy, (policy) => policy.offerConnection)
  @JoinColumn({ name: 'policyId' })
  policy: Policy;

  @ManyToOne(() => Insurer, (insurer) => insurer.offerConnection)
  @JoinColumn({ name: 'insurerId' })
  insurer: Insurer;
}
