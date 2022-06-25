import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsString } from "class-validator";

export class loginPayload {
	@ApiProperty()
	@IsString()
		username: string;
	
	@ApiProperty()
	@IsString()
		password: string;	
}