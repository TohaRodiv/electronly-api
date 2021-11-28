import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Banner } from "./Banner";

@Injectable()
export class BannerService extends TypeOrmCrudService<Banner> {
	constructor(
		@InjectRepository(Banner)
		protected repo: Repository<Banner>
	) {
		super(repo);
	}
}