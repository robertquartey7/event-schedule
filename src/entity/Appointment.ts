import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { BusinessOwner } from "./BusinessOwner";
import { Service } from "./Service";
import { Business } from "./Business";

@Entity("appointment")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "datetime" })
  date_time: Date;

  @Column()
  status: string;

  @Column({ type: "uuid" })
  customer_id: string;

  @Column({ type: "uuid" })
  business_owner_id: string;

  @Column({ type: "uuid" })
  service_id: string;

  @Column({ type: "uuid" })
  business_id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => Customer, customer => customer.appointments)
  customer: Customer;

  @ManyToOne(() => BusinessOwner, businessOwner => businessOwner.appointments)
  businessOwner: BusinessOwner;

  @ManyToOne(() => Service, service => service.appointments)
  service: Service;

  @ManyToOne(() => Business, business => business.appointments)
  business: Business;
}
