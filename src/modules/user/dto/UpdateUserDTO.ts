import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./CreateUserDTO";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}