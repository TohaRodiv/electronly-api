import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusOrder } from "./StatusOrder";
import { StatusOrderController } from "./StatusOrderController";
import { StatusOrderService } from "./StatusOrderService";

@Module({
	imports: [
		TypeOrmModule.forFeature([StatusOrder])
	],
	exports: [
		StatusOrderService,
	],
	providers: [
		StatusOrderService,
	],
	controllers: [
		StatusOrderController,
	]
})
export class StatusOrderModule {}