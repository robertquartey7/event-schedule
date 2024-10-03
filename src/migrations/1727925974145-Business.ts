import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Business1727925974145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'business',
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'business_name',
            type: 'varchar',
            isNullable: false,
            length: '600',
          },
          {
            name: 'description', 
            type: 'text',
            isNullable: true,
          },
          {
            name: 'address', 
            type: 'varchar',
            isNullable: true,
            length: '600',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
            length: '15', 
          },
          {
            name: 'website', 
            type: 'varchar',
            isNullable: true,
            length: '255', 
          },
    
          {
            name: 'user_id', 
            type: 'varchar',
            isNullable: false,
          },
        ]
      })
    );


    await queryRunner.createForeignKey("business", new TableForeignKey({
      columnNames: ["user_id"],
      referencedTableName: "user",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE" 
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Get the table
    const table = await queryRunner.getTable("business");
  
 
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes("user_id"));
  
      if (foreignKey) {
        await queryRunner.dropForeignKey("business", foreignKey);
      }

      await queryRunner.dropTable("business");
    }
  }
  
}
