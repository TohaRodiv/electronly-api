import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Article } from "./Article";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
	constructor(
		@InjectRepository(Article)
		protected repo: Repository<Article>
	) {
		super(repo);
	}

	public async findByIds(ids: number[]): Promise<Article[]> {
		return await this.repo.findByIds(ids);
	}
}