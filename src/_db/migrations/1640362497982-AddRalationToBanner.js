const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddRalationToBanner1640362497982 {
    name = 'AddRalationToBanner1640362497982'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "banners_image_files" ("bannersId" integer NOT NULL, "filesId" integer NOT NULL, CONSTRAINT "PK_5af59f3e2c659fe24417ed57611" PRIMARY KEY ("bannersId", "filesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_976498d2e0e910424a280f9a4a" ON "banners_image_files" ("bannersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_680168aaba152810ebc0a4e4a0" ON "banners_image_files" ("filesId") `);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" ADD CONSTRAINT "FK_976498d2e0e910424a280f9a4a7" FOREIGN KEY ("bannersId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" ADD CONSTRAINT "FK_680168aaba152810ebc0a4e4a0e" FOREIGN KEY ("filesId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banners_image_files" DROP CONSTRAINT "FK_680168aaba152810ebc0a4e4a0e"`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" DROP CONSTRAINT "FK_976498d2e0e910424a280f9a4a7"`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_680168aaba152810ebc0a4e4a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_976498d2e0e910424a280f9a4a"`);
        await queryRunner.query(`DROP TABLE "banners_image_files"`);
    }
}
