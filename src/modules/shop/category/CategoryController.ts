import { CategoryService } from "./CategoryService";
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ShopCategory } from "./ShopCategory";
import { ShopCreateCategoryDTO } from "./dto/ShopCreateCategoryDTO";
import { ShopUpdateCategoryDTO } from "./dto/ShopUpdateCategoryDTO";
import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";

@Controller("/shop/categories")
@Crud({
	model: {
		type: ShopCategory,
	},
	query: {
		join: {
			products: {
				eager: true,
			},
		}
	},
	routes: {
		deleteOneBase: {
			returnDeleted: true,
		},
	},
	dto: {
		create: ShopCreateCategoryDTO,
		update: ShopUpdateCategoryDTO,
	}
})
@ApiTags("Категории магазина")
@UseGuards(JwtAuthGuard)
export class CategoryController implements CrudController<ShopCategory> {
	constructor(
		public service: CategoryService,
	) {}

	@Post()
	public async createAndSave(@Body() dto: ShopCreateCategoryDTO): Promise<ShopCategory> {
		return await this.service.createAndSave(dto);
	}

	@Patch(":id")
	public async udpate(
		@Param("id") id: number,
		@Body() dto: ShopUpdateCategoryDTO,
	): Promise<ShopCategory> {
		return await this.service.update(id, dto);
	}
}