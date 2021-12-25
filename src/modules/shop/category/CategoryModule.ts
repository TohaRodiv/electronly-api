import { FileModule } from "#modules/file/FileModule";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/ProductModule";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";
import { ShopCategory } from "./ShopCategory";

@Module({
	imports: [
		TypeOrmModule.forFeature([ShopCategory]),
		forwardRef(() => ProductModule),
		FileModule,
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