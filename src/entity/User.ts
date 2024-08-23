
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Password } from "./Password";


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

  @OneToMany(() => Password, (resetPassword: Password) => resetPassword.user)
  resetPasswords?: Password[];

  userData({ username, email, password }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}


