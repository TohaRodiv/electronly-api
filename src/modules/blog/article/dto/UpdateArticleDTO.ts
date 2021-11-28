import { PartialType } from "@nestjs/swagger";
import { CreateArticleDTO } from "./CreateArticleDTO";

export class UpdateArticleDTO extends PartialType(CreateArticleDTO) {}