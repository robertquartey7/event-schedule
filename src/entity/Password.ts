import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class RestPassword extends BaseEntity {
  @PrimaryColumn()
  @Generated("uuid")
  id!: string;

  @Column({ nullable: true, type: "varchar" })
  token!: string;

  @Column({ type: "boolean", default: false })
  is_expired?: boolean;

  @Column({ type: "datetime", nullable: true })
  expiration_date?: Date;

  @JoinColumn()
  @OneToOne(() => User)
  user?: User;
}

