
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Password } from "./Password";
import { Business } from './Business'; 

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 600 })
  username?: string;

  @Column({ type: "varchar", length: 600 })
  email?: string;

  @Column({ type: "varchar", length: 600 })
  password?: string;

  @Column({ type: "boolean", default: false, nullable: false })
  is_active!: boolean;

  @OneToMany(() => Password, resetPassword => resetPassword.user)
  resetPasswords?: Password[];

  @OneToMany(() => Business, business => business.user)
  businesses?: Business[];
  
  userData({ username, email, password }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

