import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./Article";
import { ArticleController } from "./ArticleController";
import { ArticleService } from "./ArticleService";

@Module({
	imports: [
		TypeOrmModule.forFeature([Article]),
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