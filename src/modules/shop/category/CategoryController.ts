import { CategoryService } from "./CategoryService";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ShopCategory } from "./ShopCategory";
import { ShopCreateCategoryDTO } from "./dto/ShopCreateCategoryDTO";
import { ShopUpdateCategoryDTO } from "./dto/ShopUpdateCategoryDTO";

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
export class CategoryController implements CrudController<ShopCategory> {
	constructor(
		public service: CategoryService,
	) {}
}