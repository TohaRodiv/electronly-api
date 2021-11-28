import { PartialType } from "@nestjs/swagger";
import { BlogCreateCategoryDTO } from "./BlogCreateCategoryDTO";

export class BlogUpdateCategoryDTO extends PartialType(BlogCreateCategoryDTO) {}