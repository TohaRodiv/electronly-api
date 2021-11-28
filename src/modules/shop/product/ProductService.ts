import { FileService } from "#modules/file/FileService";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { CategoryService } from "../category/CategoryService";
import { CreateProductDTO } from "./dto/CreateProductDTO";
import { UpdateProductDTO } from "./dto/UpdateProductDTO";
import { Product } from "./Product";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
	constructor(
		@InjectRepository(Product)
		protected repo: Repository<Product>,
		
		@Inject(CategoryService)
		protected categoryService: CategoryService,

		@Inject(FileService)
		protected fileService: FileService,
	) {
		super(repo);
	}

	public async findByIds(ids: number[]): Promise<Product[]> {
		return await this.repo.findByIds(ids);
	}

	public async createAndSave(dto: CreateProductDTO): Promise<Product>{
		const {
			category,
			images,
			...fields
		} = dto;

		const product = this.repo.create(fields);

		if (category) {
			product.category = await this.categoryService.findOne(category);
		}

		if (images) {
			product.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(product);
	}

	public async update(id: number, dto: UpdateProductDTO): Promise<Product> {
		const {
			category,
			images,
			...fields
		} = dto;

		const product = await this.repo.findOne(id);

		for(const productField in product) {
			if(productField in fields) {
				product[productField] = fields[productField];
			}
		}

		if (category) {
			product.category = await this.categoryService.findOne(category);
		}

		if (images) {
			product.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(product);
	}
}