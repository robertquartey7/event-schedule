import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Business } from "./Business";
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity("business_owner")
export class BusinessOwner {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 600 })
  name: string;

  @Column({ type: "json", nullable: true })
  specialties: any;

  @Column({ type: "json", nullable: true })
  availability: any;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ type: "uuid" })
  business_id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => Business, business => business.businessOwners)
  business: Business;

  @ManyToOne(() => User, user => user.businessOwners)
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.businessOwner)
  appointments: Appointment[];
}
