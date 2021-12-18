import { EncryptionModule } from "#modules/encryption/EncryptionModule";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./User";
import { UserController } from "./UserController";
import { UserService } from "./UserService";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		EncryptionModule,
	],
	exports: [
		UserService,
	],
	providers: [
		UserService,
	],
	controllers: [
		UserController,
	],
})
export class UserModule {}