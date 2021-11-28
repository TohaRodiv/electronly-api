import { PartialType } from "@nestjs/swagger";
import { CreateProductImageDTO } from "./CreateProductImageDTO";

export class UpdateProductImageDTO extends PartialType(CreateProductImageDTO) {}