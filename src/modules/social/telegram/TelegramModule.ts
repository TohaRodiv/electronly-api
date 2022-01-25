import { ConfigModule } from "#modules/config/ConfigModule";
import { ConfigService } from "#modules/config/ConfigService";
import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramInitService } from "./TelegramInitService";
import { TelegramService } from "./TelegramService";

@Module({
	imports: [
		ConfigModule,
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				token: config.telegramAccount.token,
			})
		})
	],
	providers: [
		TelegramInitService,
		TelegramService,
	],
	exports: [
		TelegramService,
	],
})
export class TelegramModule { }