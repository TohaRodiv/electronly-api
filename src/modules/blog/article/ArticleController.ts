import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Article } from "./Article";
import { ArticleService } from "./ArticleService";
import { CreateArticleDTO } from "./dto/CreateArticleDTO";
import { UpdateArticleDTO } from "./dto/UpdateArticleDTO";

@Controller("/blog/articles")
@Crud({
	model: {
		type: Article
	},
	query: {
		join: {
			category: {
				eager: true,
			},
		},
	},
	routes: {
		deleteOneBase: {
			returnDeleted: true,
		},
		only: [
			"deleteOneBase",
			"getManyBase",
			"getOneBase",
		],
	},
	dto: {
		create: CreateArticleDTO,
		update: UpdateArticleDTO,
	}
})
@ApiTags("Материалы блога")
@UseGuards(JwtAuthGuard)
export class ArticleController implements CrudController<Article> {
	constructor(
		public service: ArticleService,
	) {}

	@Post()
	public async createAndSave(@Body() dto: CreateArticleDTO): Promise<Article> {
		return await this.service.createAndSave(dto);
	}

	@Patch(":id")
	public async udpate(
		@Param("id") id: number,
		@Body() dto: UpdateArticleDTO,
	): Promise<Article> {
		return await this.service.update(id, dto);
	}
}