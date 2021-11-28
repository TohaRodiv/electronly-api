import { ConfigService } from "#modules/config/ConfigService";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../AuthService";
import { loginPayload } from "../dto/loginPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.jwt.secret,
		});
	}

	public validate(payload: loginPayload): {password: string, username: string} {
		const result = {
			password: payload.password,
			username: payload.username,
		};
		return result;
	}
}