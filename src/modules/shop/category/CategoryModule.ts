import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";
import { ShopCategory } from "./ShopCategory";

@Module({
	imports: [
		TypeOrmModule.forFeature([ShopCategory]),
	],
	exports: [
		CategoryService,
	],
	providers: [
		CategoryService,
	],
	controllers: [
		CategoryController,
	],
})
export class CategoryModule {}