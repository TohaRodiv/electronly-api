import { EncryptionService } from "#modules/encryption/EncryptionService";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/CreateUserDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { User } from "./User";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
	constructor(
		@InjectRepository(User)
		protected repo: Repository<User>,

		@Inject(EncryptionService)
		protected encryptionService: EncryptionService,
	) {
		super(repo);
	}

	public async findOneByOptions(options: FindOneOptions): Promise<User> {
		return await this.repo.findOne(options);
	}

	public async register(dto: CreateUserDTO): Promise<User> {
		const user = await this.userFIeldFill(this.repo.create(), dto);
		return await this.repo.save(user);
	}

	public async update(id: number, dto: UpdateUserDTO): Promise<User> {
		const user = await this.userFIeldFill(await this.repo.findOne(id), dto);
		return await this.repo.save(user);
	}

	private async userFIeldFill (user: User, dto: CreateUserDTO | UpdateUserDTO): Promise<User> {
		for (const userKey in user) {
			if (userKey in dto) {
				if (userKey === "password") {
					user[userKey] = await this.encryptionService.hash(dto[userKey]);
				} else {
					user[userKey] = dto[userKey];
				}
			}
		}

		return user;
	}
}