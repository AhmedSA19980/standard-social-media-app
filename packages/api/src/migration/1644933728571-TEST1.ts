import {MigrationInterface, QueryRunner} from "typeorm";

export class TEST11644933728571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "title" TO "name"`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`
      );
    }

}
