import { FileService } from "#modules/file/FileService";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Banner } from "./Banner";
import { CreateBannerDTO } from "./dto/CreateBannerDTO";
import { UpdateBannerDTO } from "./dto/UpdateBannerDTO";

@Injectable()
export class BannerService extends TypeOrmCrudService<Banner> {
	constructor(
		@InjectRepository(Banner)
		protected repo: Repository<Banner>,

		@Inject(FileService)
		protected readonly fileService: FileService,
	) {
		super(repo);
	}

	public async createAndSave(dto: CreateBannerDTO): Promise<Banner> {
		const {
			images,
			...fields
		} = dto;

		const banner = this.repo.create(fields);

		if (images) {
			banner.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(banner);
	}

	public async update(id: number, dto: UpdateBannerDTO): Promise<Banner> {
		const {
			images,
			...fields
		} = dto;

		const banner = await this.repo.findOne(id);

		for (const bannerKey in banner) {
			if (bannerKey in fields) {
				banner[bannerKey] = fields[bannerKey];
			}
		}

		if (images) {
			banner.images = await this.fileService.findByIds(images);
		}

		return await this.repo.save(banner);
	}
}