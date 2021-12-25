import { FileModule } from "#modules/file/FileModule";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/CategoryModule";
import { Product } from "./Product";
import { ProductController } from "./ProductController";
import { ProductService } from "./ProductService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Product]),
		FileModule,
		forwardRef(() => CategoryModule),
	],
	exports: [
		ProductService,
	],
	providers: [
		ProductService,
	],
	controllers: [
		ProductController,
	],
})
export class ProductModule {}