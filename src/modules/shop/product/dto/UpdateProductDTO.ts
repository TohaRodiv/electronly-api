import { PartialType } from "@nestjs/swagger";
import { CreateProductDTO } from "./CreateProductDTO";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}