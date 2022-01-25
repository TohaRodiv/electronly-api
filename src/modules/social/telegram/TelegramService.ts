import { ConfigService } from "#modules/config/ConfigService";
import { Inject } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { ISocialService } from "../interfaces/ISocialService";

export class TelegramService implements ISocialService {
	constructor (
		@InjectBot()
		private bot: Telegraf<Context>,

		@Inject(ConfigService)
		private configService: ConfigService,
	) {}
	
	public async sendMessage(message: string): Promise<void> {
		this.configService.telegramAccount.chatIds.forEach(chatId => {
			this.bot.telegram.sendMessage(chatId, message, {
				parse_mode: "HTML",
			});
		});
	}
}