const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialTables1640395978803 {
    name = 'InitialTables1640395978803'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "blog-categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ff7db0505d0085cc83c355d8c57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL DEFAULT '', "active" boolean NOT NULL DEFAULT true, "categoryId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL DEFAULT '', "price" integer, "count" integer, "active" boolean NOT NULL DEFAULT true, "categoryId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop-categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_1020fc8e759eeed0e7656a9ab9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ce74efe7eb470f79f655822f2e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "fio" character varying NOT NULL, "tel" character varying NOT NULL, "email" character varying NOT NULL DEFAULT '', "comment" character varying NOT NULL DEFAULT '', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banners" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles_images_files" ("articlesId" integer NOT NULL, "filesId" integer NOT NULL, CONSTRAINT "PK_53270cbd48da2d12d35e0724ff9" PRIMARY KEY ("articlesId", "filesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31704f7b2cf7e14117e9432e75" ON "articles_images_files" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6afcdc211f687c76b8963d8594" ON "articles_images_files" ("filesId") `);
        await queryRunner.query(`CREATE TABLE "products_images_files" ("productsId" integer NOT NULL, "filesId" integer NOT NULL, CONSTRAINT "PK_c21122451a07781aef6e7b4f734" PRIMARY KEY ("productsId", "filesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10dc67c6a9bffc93b645ec7bb8" ON "products_images_files" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b131624a9041980aefdfcb7e1" ON "products_images_files" ("filesId") `);
        await queryRunner.query(`CREATE TABLE "orders_products" ("orderId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_ae4c39528a6f306d2dd36a3a887" PRIMARY KEY ("orderId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_823bad3524a5d095453c43286b" ON "orders_products" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c5da576f0342e179fd678c9427" ON "orders_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "banners_image_files" ("bannersId" integer NOT NULL, "filesId" integer NOT NULL, CONSTRAINT "PK_5af59f3e2c659fe24417ed57611" PRIMARY KEY ("bannersId", "filesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_976498d2e0e910424a280f9a4a" ON "banners_image_files" ("bannersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_680168aaba152810ebc0a4e4a0" ON "banners_image_files" ("filesId") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_9cf383b5c60045a773ddced7f23" FOREIGN KEY ("categoryId") REFERENCES "blog-categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "shop-categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc" FOREIGN KEY ("statusId") REFERENCES "order-status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles_images_files" ADD CONSTRAINT "FK_31704f7b2cf7e14117e9432e759" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_images_files" ADD CONSTRAINT "FK_6afcdc211f687c76b8963d85948" FOREIGN KEY ("filesId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_images_files" ADD CONSTRAINT "FK_10dc67c6a9bffc93b645ec7bb8c" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_images_files" ADD CONSTRAINT "FK_8b131624a9041980aefdfcb7e1a" FOREIGN KEY ("filesId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_823bad3524a5d095453c43286bb" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_c5da576f0342e179fd678c94276" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" ADD CONSTRAINT "FK_976498d2e0e910424a280f9a4a7" FOREIGN KEY ("bannersId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" ADD CONSTRAINT "FK_680168aaba152810ebc0a4e4a0e" FOREIGN KEY ("filesId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banners_image_files" DROP CONSTRAINT "FK_680168aaba152810ebc0a4e4a0e"`);
        await queryRunner.query(`ALTER TABLE "banners_image_files" DROP CONSTRAINT "FK_976498d2e0e910424a280f9a4a7"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_c5da576f0342e179fd678c94276"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_823bad3524a5d095453c43286bb"`);
        await queryRunner.query(`ALTER TABLE "products_images_files" DROP CONSTRAINT "FK_8b131624a9041980aefdfcb7e1a"`);
        await queryRunner.query(`ALTER TABLE "products_images_files" DROP CONSTRAINT "FK_10dc67c6a9bffc93b645ec7bb8c"`);
        await queryRunner.query(`ALTER TABLE "articles_images_files" DROP CONSTRAINT "FK_6afcdc211f687c76b8963d85948"`);
        await queryRunner.query(`ALTER TABLE "articles_images_files" DROP CONSTRAINT "FK_31704f7b2cf7e14117e9432e759"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_9cf383b5c60045a773ddced7f23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_680168aaba152810ebc0a4e4a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_976498d2e0e910424a280f9a4a"`);
        await queryRunner.query(`DROP TABLE "banners_image_files"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5da576f0342e179fd678c9427"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_823bad3524a5d095453c43286b"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b131624a9041980aefdfcb7e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10dc67c6a9bffc93b645ec7bb8"`);
        await queryRunner.query(`DROP TABLE "products_images_files"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6afcdc211f687c76b8963d8594"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31704f7b2cf7e14117e9432e75"`);
        await queryRunner.query(`DROP TABLE "articles_images_files"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "banners"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order-status"`);
        await queryRunner.query(`DROP TABLE "shop-categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "blog-categories"`);
    }
}
