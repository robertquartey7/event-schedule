import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Password1724281449615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reset_password",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        length: '600',
                        isNullable: true
                    },
                    {
                        name: 'is_expired',
                        type: 'boolen',
                        length: '600',
                        default: false
                    },
                    {
                        name: 'expiration_date',
                        type: 'timestamp',
                    },

                ],
                foreignKeys: [
                    {
                        columnNames: ['user_id'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reset_password');
    }

}
