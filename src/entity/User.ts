import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";


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

  userData({ username, email, password }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}


