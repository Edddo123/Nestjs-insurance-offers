import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSetup1636933307892 implements MigrationInterface {
    name = 'initialSetup1636933307892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policy" DROP CONSTRAINT "FK_e1d4e476ca7d81d16e7b2df4f6f"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_49f86fab7d84ebbffc1c2fdc5c8"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_0c637191ac5fcc3eabe3e5c9c1d"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "policy" ADD CONSTRAINT "FK_e1d4e476ca7d81d16e7b2df4f6f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_49f86fab7d84ebbffc1c2fdc5c8" FOREIGN KEY ("policyId") REFERENCES "policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_0c637191ac5fcc3eabe3e5c9c1d" FOREIGN KEY ("insurerId") REFERENCES "insurer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_0c637191ac5fcc3eabe3e5c9c1d"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_49f86fab7d84ebbffc1c2fdc5c8"`);
        await queryRunner.query(`ALTER TABLE "policy" DROP CONSTRAINT "FK_e1d4e476ca7d81d16e7b2df4f6f"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_0c637191ac5fcc3eabe3e5c9c1d" FOREIGN KEY ("insurerId") REFERENCES "insurer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_49f86fab7d84ebbffc1c2fdc5c8" FOREIGN KEY ("policyId") REFERENCES "policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "policy" ADD CONSTRAINT "FK_e1d4e476ca7d81d16e7b2df4f6f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
