import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { TransformFilePathInterceptor } from "#common/interceptors/TransformFilePathInterceptor";
import { FileService } from "#modules/file/FileService";
import { Body, Controller, Param, Patch, Post, UseGuards, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, } from "@nestjsx/crud";
import { CreateProductDTO } from "./dto/CreateProductDTO";
import { UpdateProductDTO } from "./dto/UpdateProductDTO";
import { Product } from "./Product";
import { ProductService } from "./ProductService";

@Controller("/shop/products")
@Crud({
	model: {
		type: Product,
	},
	routes: {
		only: [
			"deleteOneBase",
			"getManyBase",
			"getOneBase",
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
	query: {
		join: {
			category: {
				eager: true,
			},
			orders: {
				eager: true,
			},
			images: {
				eager: true,
			}
		}
	},
	
	dto: {
		create: CreateProductDTO,
		update: UpdateProductDTO,
	}
})
@ApiTags("Товары")
@UseGuards(JwtAuthGuard)
export class ProductController implements CrudController<Product> {
	constructor(
		public readonly service: ProductService,
	) { }

	@Post()
	public async createAndSave(@Body() dto: CreateProductDTO): Promise<Product> {
		return await this.service.createAndSave(dto);
	}

	@Patch(":id")
	public async udpate(
		@Param("id") id: number,
		@Body() dto: UpdateProductDTO,
	): Promise<Product> {
		return await this.service.update(id, dto);
	}
	
}