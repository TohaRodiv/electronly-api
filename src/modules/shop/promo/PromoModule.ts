import { Module } from "@nestjs/common";
import { BannerModule } from "./banner/BannerModule";

@Module({
	imports: [
		BannerModule,
	],
	providers: [],
	controllers: [],
})
export class PromoModule {}