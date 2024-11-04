import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 600 })
  name: string;

  @Column({ length: 600 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ type: "uuid" })
  user_id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => User, user => user.customers)
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.customer)
  appointments: Appointment[];
}
