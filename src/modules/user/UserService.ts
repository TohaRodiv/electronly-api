import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./User";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
	constructor(
		@InjectRepository(User)
		protected repo: Repository<User>
	) {
		super(repo);
	}
	
	public async findOneByOptions (options: FindOneOptions): Promise<User>{
		return await this.repo.findOne(options);
	}
}