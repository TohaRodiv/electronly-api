import { PartialType } from "@nestjs/swagger";
import { CreateStatusOrderDTO } from "./CreateStatusOrderDTO";

export class UpdateStatusOrderDTO extends PartialType(CreateStatusOrderDTO) {}