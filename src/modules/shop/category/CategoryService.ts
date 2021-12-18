import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ShopCategory } from "./ShopCategory";

@Injectable()
export class CategoryService extends TypeOrmCrudService<ShopCategory> {
	constructor(
		@InjectRepository(ShopCategory)
		protected repo: Repository<ShopCategory>
	) {
		super(repo);
	}
}