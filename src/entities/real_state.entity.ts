import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./addresses.entity";

import { Category } from "./categories.entity";
import { Schedule } from "./schedules_users_properties.entity";

@Entity("RealEstate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: false })
  sold?: boolean;

  @Column({ type: "int" })
  size?: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @CreateDateColumn({ type: "date" })
  createdAt?: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt?: string;

  @OneToMany(() => Schedule, (schedules) => schedules.realEstate)
  schedules: Schedule[];

  @ManyToOne(() => Category)
  @JoinColumn()
  category?: Category | null | undefined;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
export { RealEstate };
