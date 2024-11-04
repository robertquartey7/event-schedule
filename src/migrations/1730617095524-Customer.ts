import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Customer1730617095524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "customer",
        columns: [
          {
            name: "id",
            type: "uuid", // Consider using UUID for better uniqueness
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "600",
            isNullable: false, // Consider making this required
          },
          {
            name: "email",
            type: "varchar",
            length: "600",
            isNullable: false, // Consider making this required
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "20", // Adjust length based on expected formats
            isNullable: true,
          },
          {
            name: "user_id",
            type: "uuid", // Assuming user_id is also a UUID
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

    // await queryRunner.dropForeignKey("customer", "FK_customer_user_id"); // Replace with the actual foreign key name if necessary

    // await queryRunner.dropTable("customer");
  }
}
