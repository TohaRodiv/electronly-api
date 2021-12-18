import { UserModule } from "#modules/user/UserModule";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { JwtAuthGuard } from "../../common/guards/JwtAuthGuard";
import { JwtStrategy } from "./strategies/JwtStrategy";
import { ConfigModule } from "#modules/config/ConfigModule";
import { ConfigService } from "#modules/config/ConfigService";
import { EncryptionModule } from "#modules/encryption/EncryptionModule";

@Module({
	imports: [
		ConfigModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.jwt.secret,
				signOptions: {
					expiresIn: config.jwt.expiresIn,
				}
			})
		}),
		EncryptionModule,
	],
	exports: [
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
	],
	providers: [
		AuthService,
		JwtStrategy,
		JwtAuthGuard,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule { }