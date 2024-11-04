import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Service1730616055993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service",
        columns: [
          {
            name: "id",
            type: "uuid", // Consider using UUID for unique identification
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "business_id",
            type: "uuid", // Assuming business_id is also a UUID
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "255", // Limit the length for the service name
            isNullable: false,
          },
          {
            name: "duration",
            type: "int", // Duration in minutes, adjust as needed
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal", // Use decimal for price
            precision: 10, // Adjust as needed
            scale: 2,      // Two decimal places for currency
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
    await queryRunner.dropTable("service");
  }
}
