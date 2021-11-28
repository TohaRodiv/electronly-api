import { PartialType } from "@nestjs/swagger";
import { CreateBannerDTO } from "./CreateBannerDTO";

export class UpdateBannerDTO extends PartialType(CreateBannerDTO) {}