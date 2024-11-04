import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class User1718660217152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            length: "600",
          },
          {
            name: "email",
            type: "varchar",
            length: "600",
          },
          {
            name: "password",
            type: "varchar",
            length: "600",
          },
          {
            name: "is_active",
            type: "boolen",
            default: false,
          },
          {
            name: "is_email_verified",
            type: "boolen",
            isNullable: false,
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user");
    await queryRunner.dropTable("user");
  }
}
