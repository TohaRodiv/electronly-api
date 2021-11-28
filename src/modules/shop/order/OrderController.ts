import { Controller, Post, Body, Patch, Param, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateOrderDTO } from "./dto/CreateOrderDTO";
import { UpdateOrderDTO } from "./dto/UpdateOrderDTO";
import { Order } from "./Order";
import { OrderService } from "./OrderService";

@Controller("/shop/orders")
@Crud({
	model: {
		type: Order,
	},
	query: {
		join: {
			products: {
				eager: true,
			},
			status: {
				eager: true,
			}
		}
	},
	routes: {
		exclude: [
			"createManyBase",
			"createOneBase",
			"updateOneBase",
		],
		deleteOneBase: {
			returnDeleted: true,
		},
	},
	dto: {
		create: CreateOrderDTO,
		update: UpdateOrderDTO,
	}
})
@ApiTags("Заказы")
export class OrderController implements CrudController<Order> {
	constructor(
		public service: OrderService,
	) { }

	@Post()
	public async createAndSaveOne(@Body() dto: CreateOrderDTO): Promise<Order> {
		return await this.service.createAndSaveOne(dto);
	}

	@Patch(":id")
	public async update(
		@Param("id") id: number,
		@Body() dto: UpdateOrderDTO,
	): Promise<Order> {
		return await this.service.update(id, dto);
	}
}