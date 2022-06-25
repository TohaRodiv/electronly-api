import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./AuthService";
import { loginPayload } from "./dto/loginPayload";
import { JwtAuthGuard } from "../../common/guards/JwtAuthGuard";
import { TLoginResult } from "./types/TLoginResult";
import { ApiTags } from "@nestjs/swagger";

@Controller("/auth")
@ApiTags("Авторизация")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) { }

	@Post("/login")
	async login(@Body() credentials: loginPayload): Promise<TLoginResult> {
		const user = await this.authService.validateAndGetUser(credentials);
		const tokens = this.authService.generateToken(user);

		return {
			access_token: tokens.access_token,
			user_id: user.id,
		};
	}

	@UseGuards(JwtAuthGuard)
	@Get("/profile")
	async getProfile(@Request() req: Request & {user: any}): Promise<any> {
		return {
			username: req.user.username,
		};
	}
}