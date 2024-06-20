import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";


export class User1718660217152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isNullable:false
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
          { name: "is_active", type: "boolen", default: false },
          {
            name: "reset_password_id",
            type: "varchar",
            length: "600",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["reset_password_id"],
        referencedTableName: "reset_password",
        referencedColumnNames: ["id"],
      
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user");

    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("reset_password_id") !== -1
    );
    foreignKey && (await queryRunner.dropForeignKey("reset_password_id", foreignKey));
    await queryRunner.dropTable("user");
  }
}
