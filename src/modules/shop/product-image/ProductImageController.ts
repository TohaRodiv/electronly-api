import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateProductImageDTO } from "./dto/CreateProductImageDTO";
import { UpdateProductImageDTO } from "./dto/UpdateProductImageDTO";
import { ProductImage } from "./ProductImage";
import { ProductImageService } from "./ProductImageService";

@Controller("/shop/product-images")
@Crud({
	model: {
		type: ProductImage,
	},
	query: {
		join: {
			file: {
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
		create: CreateProductImageDTO,
		update: UpdateProductImageDTO,
	}
})
@ApiTags("Изображения товаров")
export class ProductImageController implements CrudController<ProductImage> {
	constructor(
		public service: ProductImageService,
	) {}
}