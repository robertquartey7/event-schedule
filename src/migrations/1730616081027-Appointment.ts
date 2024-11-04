import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Appointment1730616081027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointment",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "date_time",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "customer_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "business_owner_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "service_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "business_id",
            type: "varchar",
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
            columnNames: ["customer_id"],
            referencedTableName: "customer",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE", // Optionally handle deletes
          },
          {
            columnNames: ["business_owner_id"],
            referencedTableName: "business_owner",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["service_id"],
            referencedTableName: "service",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["business_id"],
            referencedTableName: "business",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointment");
  }
}
