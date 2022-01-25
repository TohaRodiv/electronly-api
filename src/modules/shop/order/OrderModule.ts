import { NotificationModule } from "#modules/notification/NotificationModule";
import { TelegramModule } from "#modules/social/telegram/TelegramModule";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/ProductModule";
import { StatusOrderModule } from "../status-order/StatusOrderModule";
import { Order } from "./Order";
import { OrderController } from "./OrderController";
import { OrderService } from "./OrderService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Order]),
		ProductModule,
		StatusOrderModule,
		TelegramModule,
		NotificationModule,
	],
	providers: [
		OrderService,
	],
	controllers: [
		OrderController,
	],
})
export class OrderModule {}