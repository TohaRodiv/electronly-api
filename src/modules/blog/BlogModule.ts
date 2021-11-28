import { Module } from "@nestjs/common";
import { ArticleModule } from "./article/ArticleModule";
import { CategoryModule } from "./category/CategoryModule";

@Module({
	imports: [
		ArticleModule,
		CategoryModule,
	],
})
export class BlogModule {}