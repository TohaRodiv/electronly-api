import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { StatusOrder } from "./StatusOrder";

@Injectable()
export class StatusOrderService extends TypeOrmCrudService<StatusOrder> {
	constructor(
		@InjectRepository(StatusOrder)
		protected repo: Repository<StatusOrder>
	) {
		super(repo);
	}

	public async findById(id: number): Promise<StatusOrder> {
		return await this.repo.findOne(id);
	}
}