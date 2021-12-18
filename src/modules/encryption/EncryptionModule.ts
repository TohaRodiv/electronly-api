import { ConfigModule } from "#modules/config/ConfigModule";
import { Module } from "@nestjs/common";
import { EncryptionService } from "./EncryptionService";

@Module({
	imports: [ConfigModule],
	providers: [EncryptionService],
	exports: [EncryptionService],
})
export class EncryptionModule { }