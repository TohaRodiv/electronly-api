const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddRalationToBanner1640362030145 {
    name = 'AddRalationToBanner1640362030145'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "banners_images_files" ("bannersId" integer NOT NULL, "filesId" integer NOT NULL, CONSTRAINT "PK_ed3db8db3f14904e038896454ad" PRIMARY KEY ("bannersId", "filesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8a31c8a53a26e78d3ead84e57" ON "banners_images_files" ("bannersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0786939c37d1043f466d360c4a" ON "banners_images_files" ("filesId") `);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "banners_images_files" ADD CONSTRAINT "FK_e8a31c8a53a26e78d3ead84e57e" FOREIGN KEY ("bannersId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "banners_images_files" ADD CONSTRAINT "FK_0786939c37d1043f466d360c4ae" FOREIGN KEY ("filesId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banners_images_files" DROP CONSTRAINT "FK_0786939c37d1043f466d360c4ae"`);
        await queryRunner.query(`ALTER TABLE "banners_images_files" DROP CONSTRAINT "FK_e8a31c8a53a26e78d3ead84e57e"`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0786939c37d1043f466d360c4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8a31c8a53a26e78d3ead84e57"`);
        await queryRunner.query(`DROP TABLE "banners_images_files"`);
    }
}
