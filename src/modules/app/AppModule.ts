import { DatabaseModule } from "#modules/database/DatabaseModule";
import { Module } from "@nestjs/common";
import { ConfigModule } from "#modules/config/ConfigModule";
import { UserModule } from "#modules/user/UserModule";
import { AuthModule } from "#modules/auth/AuthModule";
import { BlogModule } from "#modules/blog/BlogModule";
import { ShopModule } from "#modules/shop/ShopModule";
import { FileModule } from "#modules/file/FileModule";
import { AppService } from "./AppService";
import { SocialModule } from "#modules/social/SocialModule";
import { NotificationModule } from "#modules/notification/NotificationModule";
import { NotificationService } from "#modules/notification/NotificationService";
import { TelegramService } from "#modules/social/telegram/TelegramService";

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		UserModule,
		AuthModule,
		BlogModule,
		ShopModule,
		FileModule,
		SocialModule,
		NotificationModule,
	],
	exports: [],
	providers: [
		AppService,
	],
	controllers: [
	],
})
export class AppModule { }