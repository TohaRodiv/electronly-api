import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateStatusOrderDTO } from "./dto/CreateStatusOrderDTO";
import { UpdateStatusOrderDTO } from "./dto/UpdateStatusOrderDTO";
import { StatusOrder } from "./StatusOrder";
import { StatusOrderService } from "./StatusOrderService";

@Controller("/shop/status-orders")
@Crud({
	model: {
		type: StatusOrder,
	},
	routes: {
		deleteOneBase: {
			returnDeleted: true,
		},
	},
	query: {
		join: {
			orders: {
				eager: true,
			}
		}
	},
	dto: {
		create: CreateStatusOrderDTO,
		update: UpdateStatusOrderDTO,
	}
})
@ApiTags("Статусы заказов")
@UseGuards(JwtAuthGuard)
export class StatusOrderController implements CrudController<StatusOrder> {
	constructor(
		public service: StatusOrderService,
	) {}
}