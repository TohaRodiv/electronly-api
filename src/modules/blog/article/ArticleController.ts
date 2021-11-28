import { Controller } from "@nestjs/common";
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
		}
	},
	dto: {
		create: CreateArticleDTO,
		update: UpdateArticleDTO,
	}
})
@ApiTags("Материалы блога")
export class ArticleController implements CrudController<Article> {
	constructor(
		public service: ArticleService,
	) {}
}