import { Controller } from "@nestjs/common";
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
	},
	dto: {
		create: CreateBannerDTO,
		update: UpdateBannerDTO,
	}
})
@ApiTags("Баннера")
export class BannerController implements CrudController<Banner> {
	constructor(
		public service: BannerService,
	) {}
}