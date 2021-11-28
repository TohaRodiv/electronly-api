import { User } from "#modules/user/User";
import { UserService } from "#modules/user/UserService";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { loginPayload } from "./dto/loginPayload";
import { TJwtToken } from "./types/TJwtToken";
import { TPayload } from "./types/TPayload";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	public async validateAndGetUser ({username, password}: loginPayload): Promise<User> {
		const user = await this.userService.findOneByOptions({
			where: {
				name: username,
				password: password,
			}
		});

		if (!user) {
			throw new UnauthorizedException(`User ${username} not found or password is invalid!`);
		}

		return user;
	}

	public generateToken(user: User): TJwtToken{
		const payload: TPayload = {
			username: user.name,
			password: user.password,
			sub: user.id,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}