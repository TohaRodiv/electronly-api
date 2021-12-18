import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./AuthService";
import { loginPayload } from "./dto/loginPayload";
import { JwtAuthGuard } from "../../common/guards/JwtAuthGuard";
import { TJwtToken } from "./types/TJwtToken";
import { ApiTags } from "@nestjs/swagger";

@Controller("/auth")
@ApiTags("Авторизация")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) { }

	@Post("/login")
	async login(@Body() credentials: loginPayload): Promise<TJwtToken> {
		const user = await this.authService.validateAndGetUser(credentials);
		return this.authService.generateToken(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/profile")
	async getProfile(@Request() req: Request & {user: any}): Promise<any> {
		return {
			user: req.user,
		};
	}
}