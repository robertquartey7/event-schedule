import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Password1718669271362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reset_password",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "600",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "token",
            type: "varchar",
            length: "600",
            isNullable: true,
          },
          {
            name: "is_expired",
            type: "boolen",
            default: false,
          },
          {
            name: "expiration_date",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "varchar",
            length: "600",
            isNullable: false,
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "reset_password",

      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
      })
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("reset_password");

        const foreignKey = table?.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("user_id") !== -1
        );
        foreignKey && (await queryRunner.dropForeignKey("user_id", foreignKey));
        await queryRunner.dropTable("reset_password");
  }
}
