import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ArticleService } from "../article/ArticleService";
import { BlogCategory } from "./BlogCategory";
import { BlogCreateCategoryDTO } from "./dto/BlogCreateCategoryDTO";
import { BlogUpdateCategoryDTO } from "./dto/BlogUpdateCategoryDTO";

@Injectable()
export class CategoryService extends TypeOrmCrudService<BlogCategory> {
	constructor(
		@InjectRepository(BlogCategory)
		protected repo: Repository<BlogCategory>,

		@Inject(ArticleService)
		protected articleService: ArticleService,
	) {
		super(repo);
	}

	public async createAndSave(dto: BlogCreateCategoryDTO): Promise<BlogCategory> {
		const {
			articles,
			...fields
		} = dto;

		const category = this.repo.create(fields);

		if (articles) {
			category.articles = await this.articleService.findByIds(articles);
		}

		return await this.repo.save(category);
	}

	public async update(id: number, dto: BlogUpdateCategoryDTO): Promise<BlogCategory> {
		const {
			articles,
			...fields
		} = dto;

		const category = await this.repo.findOne(id);

		for(const categoryField in category) {
			if (categoryField in fields) {
				category[categoryField] = fields[categoryField];
			}
		}

		if (articles) {
			category.articles = await this.articleService.findByIds(articles);
		}

		return await this.repo.save(category);
	}
}