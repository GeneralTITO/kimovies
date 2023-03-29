import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RealEstate } from "./real_state.entity";
import { User } from "./users.entity";

@Entity("shedules_users_propertie")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string | Date;

  @Column({ type: "time" })
  hour: string | number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => RealEstate)
  @JoinColumn()
  realEstate: RealEstate;
}
export { Schedule };
