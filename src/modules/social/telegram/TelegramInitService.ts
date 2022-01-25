import { Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class TelegramInitService {
	@Start()
	private async onStart(ctx: Context): Promise<void> {
		await ctx.reply("Добро пожаловать, мой хозяин!");
	}
}