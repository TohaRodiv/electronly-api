import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImage } from "./ProductImage";
import { ProductImageService } from "./ProductImageService";
import { ProductImageController } from "./ProductImageController";

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductImage]),
	],
	providers: [
		ProductImageService,
	],
	controllers: [
		ProductImageController,
	],
})
export class ProductImageModule {}