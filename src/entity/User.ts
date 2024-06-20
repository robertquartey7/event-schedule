import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RestPassword } from "./Password";
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
    
  @Column({ type: "varchar", length: 600 })
  @OneToOne(() => RestPassword)
  @JoinColumn()
  reset_password?: RestPassword;
}
