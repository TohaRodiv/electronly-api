import { ShopCreateCategoryDTO } from "#modules/shop/category/dto/ShopCreateCategoryDTO"
import { PartialType } from "@nestjs/swagger"

export class ShopUpdateCategoryDTO extends PartialType(ShopCreateCategoryDTO) {}