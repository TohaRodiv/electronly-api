import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ProductImage } from "./ProductImage";

@Injectable()
export class ProductImageService extends TypeOrmCrudService<ProductImage> {
	constructor(
		@InjectRepository(ProductImage)
		protected repo: Repository<ProductImage>
	) {
		super(repo);
	}
}