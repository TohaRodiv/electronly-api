import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateUserDTO } from "./dto/CreateUserDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { User } from "./User";
import { UserService } from "./UserService";

@Controller("/users")
@ApiTags("Пользователи")
@Crud({
	model: {
		type: User,
	},
	routes: {
		deleteOneBase: {
			returnDeleted: true,
		},
		exclude: ["createManyBase", "createOneBase", "replaceOneBase", "updateOneBase"]
	},
})
@UseGuards(JwtAuthGuard)
export class UserController implements CrudController<User> {
	constructor(
		public service: UserService,
	) {}

	@Post()
	async register (@Body() dto: CreateUserDTO): Promise<User> {
		return await this.service.register(dto);
	}

	@Patch(":id")
	async updateOne (
		@Param("id") id: number,
		@Body() dto: UpdateUserDTO
		): Promise<User> {
		return await this.service.update(id, dto);
	}
}