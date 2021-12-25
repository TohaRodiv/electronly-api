import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Banner } from "./Banner";
import { BannerService } from "./BannerService";
import { CreateBannerDTO } from "./dto/CreateBannerDTO";
import { UpdateBannerDTO } from "./dto/UpdateBannerDTO";

@Controller("/shop/promos/banners")
@Crud({
	model: {
		type: Banner,
	},
	routes: {
		deleteOneBase: {
			returnDeleted: true,
		},
		only: [
			"deleteOneBase",
			"getManyBase",
			"getOneBase",
		],
	},
	dto: {
		create: CreateBannerDTO,
		update: UpdateBannerDTO,
	},
	query: {
		join: {
			images: {
				eager: true,
			}
		}
	}
})
@ApiTags("Баннера")
@UseGuards(JwtAuthGuard)
export class BannerController implements CrudController<Banner> {
	constructor(
		public service: BannerService,
	) {}

	@Post()
	public async createAndSave(@Body() dto: CreateBannerDTO): Promise<Banner> {
		return await this.service.createAndSave(dto);
	}

	@Patch(":id")
	public async udpate(
		@Param("id") id: number,
		@Body() dto: UpdateBannerDTO,
	): Promise<Banner> {
		return await this.service.update(id, dto);
	}
}