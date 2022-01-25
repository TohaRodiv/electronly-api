import { Module } from "@nestjs/common";
import { NotificationService } from "./NotificationService";

@Module({
	providers: [
		NotificationService,
	],
})
export class NotificationModule {}