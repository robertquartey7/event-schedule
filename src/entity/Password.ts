import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@Entity('reset_password')
export class Password extends BaseEntity {
  @PrimaryColumn()
  @Generated("uuid")
  id!: string;

  @Column({ nullable: true, type: "varchar" })
  token!: string;

  @Column({ type: "boolean", default: false })
  is_expired?: boolean;

  @Column({ type: "datetime", nullable: true })
  expiration_date?: Date;

  @JoinColumn({ name: 'user_id'})
  @ManyToOne(() => User, (user: User) => user.resetPasswords)
  user?: User;
}

