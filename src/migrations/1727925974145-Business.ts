import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Business1727925974145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "business",
        columns: [
          {
            name: "id",
            type: "uuid", // Changed to UUID for unique identification
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "600",
            isNullable: false,
          },
          {
            name: "address",
            type: "varchar",
            length: "600",
            isNullable: true,
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "15",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "website",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "opening_hours",
            type: "json",
            isNullable: true,
          },
          {
            name: "services_offered",
            type: "json",
            isNullable: true,
          },
          {
            name: "rating",
            type: "decimal",
            precision: 2,
            scale: 1,
            isNullable: true,
            default: 0,
          },
          {
            name: "user_id",
            type: "uuid", // Changed to UUID to match the user table
            isNullable: false,
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
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("business", "FK_business_user_id"); // Specify foreign key name if needed
    await queryRunner.dropTable("business");
  }
}
