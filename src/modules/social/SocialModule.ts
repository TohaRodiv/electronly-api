import { Module } from "@nestjs/common";
import { TelegramModule } from "./telegram/TelegramModule";

@Module({
	imports: [
		TelegramModule,
	],
})
export class SocialModule {}