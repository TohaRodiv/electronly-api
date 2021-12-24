import { FileModule } from "#modules/file/FileModule";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Banner } from "./Banner";
import { BannerController } from "./BannerController";
import { BannerService } from "./BannerService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Banner]),
		FileModule,
	],
	providers: [
		BannerService,
	],
	controllers: [
		BannerController,
	],
})
export class BannerModule {}