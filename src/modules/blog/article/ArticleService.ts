import { FileService } from "#modules/file/FileService";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { CategoryService } from "../category/CategoryService";
import { Article } from "./Article";
import { CreateArticleDTO } from "./dto/CreateArticleDTO";
import { UpdateArticleDTO } from "./dto/UpdateArticleDTO";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
	constructor(
		@InjectRepository(Article)
		protected readonly repo: Repository<Article>,

		@Inject(forwardRef(() => CategoryService))
		protected readonly categoryService: CategoryService,

		@Inject(FileService)
		protected readonly fileService: FileService,
	) {
		super(repo);
	}

	public async findByIds(ids: number[]): Promise<Article[]> {
		return await this.repo.findByIds(ids);
	}

	public async createAndSave(dto: CreateArticleDTO): Promise<Article> {
		const {
			images,
			category,
			...fields
		} = dto;

		const article = this.repo.create(fields);

		if (category) {
			article.category = await this.categoryService.findOne(category);
		}

		if (images) {
			article.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(article);
	}

	public async update(id: number, dto: UpdateArticleDTO): Promise<Article> {
		const {
			images,
			category,
			...fields
		} = dto;

		const article = await this.repo.findOne(id);

		for (const articleKey in article) {
			if (articleKey in fields) {
				article[articleKey] = fields[articleKey];
			}
		}

		if (category) {
			article.category = await this.categoryService.findOne(category);
		}

		if (images) {
			article.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(article);
	}
}