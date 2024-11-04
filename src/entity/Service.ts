import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Business } from "./Business";
import { Appointment } from "./Appointment";

@Entity("service")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  business_id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "int" })
  duration: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => Business, (business) => business.services)
  business: Business;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}
