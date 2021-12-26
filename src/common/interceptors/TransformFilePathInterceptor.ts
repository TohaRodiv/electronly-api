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

	constructor (
		private readonly field: string = null,
	) {}

	private getFormattedFile (data: any, hostname) {
		return {
			...data,
			path: `${hostname}/${data.path}`,
		};
	}

	private getFormattedFileByItemType (items: any) {
		if (this.field && this.field in items) {
			const result = items;
			result[this.field] = this.getFormattedFile(items[this.field], hostname);
			return result;
		} else {
			return this.getFormattedFile(items, hostname);
		}
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next
			.handle()
			.pipe(map(data => {
				console.log(data);
				if (Array.isArray(data)) {
					return data.map(items => {
						return this.getFormattedFileByItemType(items);
					});
				} else {
					return this.getFormattedFileByItemType(data);
				}
			}));
	}
}