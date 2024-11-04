import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import { BusinessOwner } from "./BusinessOwner";
import { Appointment } from "./Appointment";

@Entity("business")
export class Business {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 600 })
  name: string;

  @Column({ length: 600, nullable: true })
  address: string;

  @Column({ length: 15, nullable: true })
  phone_number: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  website: string;

  @Column({ type: "json", nullable: true })
  opening_hours: any;

  @Column({ type: "json", nullable: true })
  services_offered: any;

  @Column({ type: "decimal", precision: 2, scale: 1, default: 0, nullable: true })
  rating: number;

  @Column({ type: "uuid" })
  user_id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => User, user => user.businesses)
  user: User;

  @OneToMany(() => Service, service => service.business)
  services: Service[];

  @OneToMany(() => BusinessOwner, businessOwner => businessOwner.business)
  businessOwners: BusinessOwner[];

  @OneToMany(() => Appointment, appointment => appointment.business)
  appointments: Appointment[];
}

