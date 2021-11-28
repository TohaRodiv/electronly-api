import { loginPayload } from "../dto/loginPayload";

export type TPayload = loginPayload & {
	sub: number;
}