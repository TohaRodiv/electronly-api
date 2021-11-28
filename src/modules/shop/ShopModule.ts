import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/CategoryModule";
import { OrderModule } from "./order/OrderModule";
import { ProductImageModule } from "./product-image/ProductImageModule";
import { ProductModule } from "./product/ProductModule";
import { PromoModule } from "./promo/PromoModule";
import { StatusOrderModule } from "./status-order/StatusOrderModule";

@Module({
	imports: [
		ProductModule,
		CategoryModule,
		OrderModule,
		PromoModule,
		StatusOrderModule,
		// ProductImageModule,
	],
})
export class ShopModule { }