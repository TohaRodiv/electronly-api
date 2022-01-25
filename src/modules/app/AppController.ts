import { NotificationService } from "#modules/notification/NotificationService";
import { TelegramService } from "#modules/social/telegram/TelegramService";
import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
	constructor (
		private notificationService: NotificationService,
		private telegramService: TelegramService,
	) {}

	@Get("/telegram")
	async sendMessage() {
		this.notificationService.sendMessage("Hello, world!!!", [
			this.telegramService,
		]);
	}
}