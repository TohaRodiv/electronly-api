import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
	data: T;
}

/**
 * @TODO: Брать имя домена из configService
 */
const hostname = process.env.DOMAIN_NAME;

@Injectable()
export class TransformFilePathInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next
			.handle()
			.pipe(map(data => {
				return data.map(items => (
					{
						...items,
						path: `${hostname}/${items.path}`
					}
				));
			}));
	}
}