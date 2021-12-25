import { FileService } from "#modules/file/FileService";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../product/ProductService";
import { ShopCreateCategoryDTO } from "./dto/ShopCreateCategoryDTO";
import { ShopUpdateCategoryDTO } from "./dto/ShopUpdateCategoryDTO";
import { ShopCategory } from "./ShopCategory";

@Injectable()
export class CategoryService extends TypeOrmCrudService<ShopCategory> {
	constructor(
		@InjectRepository(ShopCategory)
		protected readonly repo: Repository<ShopCategory>,

		@Inject(forwardRef(() => ProductService))
		protected readonly productService: ProductService,

		@Inject(FileService)
		protected readonly fileService: FileService,
	) {
		super(repo);
	}

	public async createAndSave(dto: ShopCreateCategoryDTO): Promise<ShopCategory> {
		const {
			products,
			images,
			...fields
		} = dto;

		const category = this.repo.create(fields);

		if (products) {
			category.products = await this.productService.findByIds(products);
		}

		if (images) {
			category.images = await this.fileService.findByIds(images);
		}


		return await this.repo.save(category);
	}

	public async update(id: number, dto: ShopUpdateCategoryDTO): Promise<ShopCategory> {
		const {
			products,
			images,
			...fields
		} = dto;

		const category = await this.repo.findOne(id);

		for (const categoryKey in category) {
			if (categoryKey in fields) {
				category[categoryKey] = fields[categoryKey];
			}
		}

		if (products) {
			category.products = await this.productService.findByIds(products);
		}

		if (images) {
			category.images = await this.fileService.findByIds(images);
		}


		return await this.repo.save(category);
	}
}