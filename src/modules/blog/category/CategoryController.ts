import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { TransformFilePathInterceptor } from "#common/interceptors/TransformFilePathInterceptor";
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { BlogCategory } from "./BlogCategory";
import { CategoryService } from "./CategoryService";
import { BlogCreateCategoryDTO } from "./dto/BlogCreateCategoryDTO";
import { BlogUpdateCategoryDTO } from "./dto/BlogUpdateCategoryDTO";

@Controller("/blog/categories")
@Crud({
	model: {
		type: BlogCategory,
	},
	query: {
		join: {
			articles: {
				eager: true,
			},
			images: {
				eager: true,
			}
		}
	},
	routes: {
		only: [
			"getManyBase",
			"getOneBase",
			"deleteOneBase",
		],
		deleteOneBase: {
			returnDeleted: true,
		},
		getManyBase: {
			interceptors: [new TransformFilePathInterceptor("images")],
		},
		getOneBase: {
			interceptors: [new TransformFilePathInterceptor("images")]
		},
	},
	dto: {
		create: BlogCreateCategoryDTO,
		update: BlogUpdateCategoryDTO,
	}
})
@ApiTags("Категории блога")
@UseGuards(JwtAuthGuard)
export class CategoryController implements CrudController<BlogCategory> {
	constructor(
		public service: CategoryService,
	) { }

	@Post()
	public async createAndSave(@Body() dto: BlogCreateCategoryDTO): Promise<BlogCategory> {
		return await this.service.createAndSave(dto);
	}

	@Patch(":id")
	public async update(
		@Param("id") id: number,
		@Body() dto: BlogUpdateCategoryDTO
	): Promise<BlogCategory> {
		return await this.service.update(id, dto);
	}
}