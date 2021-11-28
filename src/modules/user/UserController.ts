import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "./User";
import { UserService } from "./UserService";

@Controller("/users")
@ApiTags("Пользователи")
@Crud({
	model: {
		type: User,
	}
})
@UseGuards(JwtAuthGuard)
export class UserController implements CrudController<User> {
	constructor(
		public service: UserService,
	) {}
}