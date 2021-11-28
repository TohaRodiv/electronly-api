import { PartialType } from "@nestjs/swagger";
import { CreateOrderDTO } from "./CreateOrderDTO";

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}