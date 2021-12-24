import { FileModule } from "#modules/file/FileModule";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/CategoryModule";
import { Article } from "./Article";
import { ArticleController } from "./ArticleController";
import { ArticleService } from "./ArticleService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Article]),
		FileModule,
		CategoryModule,
	],
	exports: [
		ArticleService,
	],
	providers: [
		ArticleService,
	],
	controllers: [
		ArticleController,
	]
})
export class ArticleModule {}