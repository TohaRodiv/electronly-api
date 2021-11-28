import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Banner } from "./Banner";
import { BannerController } from "./BannerController";
import { BannerService } from "./BannerService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Banner]),
	],
	providers: [
		BannerService,
	],
	controllers: [
		BannerController,
	],
})
export class BannerModule {}