import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSetup1636933547826 implements MigrationInterface {
    name = 'initialSetup1636933547826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "name" character varying NOT NULL`);
    }

}
