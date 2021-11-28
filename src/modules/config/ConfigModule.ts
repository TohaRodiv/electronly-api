import { Module } from "@nestjs/common";
import { ConfigService } from "#modules/config/ConfigService";

@Module({
	exports: [
		ConfigService,
	],
	providers: [
		ConfigService,
	]
})
export class ConfigModule { }