import { DatabaseModule } from "#modules/database/DatabaseModule";
import { Module } from "@nestjs/common";
import { ConfigModule } from "#modules/config/ConfigModule";
import { UserModule } from "#modules/user/UserModule";
import { AuthModule } from "#modules/auth/AuthModule";
import { BlogModule } from "#modules/blog/BlogModule";
import { ShopModule } from "#modules/shop/ShopModule";
import { FileModule } from "#modules/file/FileModule";
import { AppService } from "./AppService";

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		UserModule,
		AuthModule,
		BlogModule,
		ShopModule,
		FileModule,
	],
	exports: [],
	providers: [
		AppService,
	],
	controllers: [
	],
})
export class AppModule { }