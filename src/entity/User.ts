import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Business } from "./Business";
import { Customer } from "./Customer";
import { BusinessOwner } from "./BusinessOwner";
import { ResetPassword } from "./Password";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 600 })
  username: string;

  @Column({ length: 600 })
  email: string;

  @Column({ length: 600 })
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_email_verified: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Business, business => business.user)
  businesses: Business[];

  @OneToMany(() => Customer, customer => customer.user)
  customers: Customer[];

  @OneToMany(() => BusinessOwner, businessOwner => businessOwner.user)
  businessOwners: BusinessOwner[];

  @OneToMany(() => ResetPassword, resetPassword => resetPassword.user)
  resetPasswords: ResetPassword[];
}
