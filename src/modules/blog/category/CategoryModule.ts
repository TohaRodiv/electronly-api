import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";
import { BlogCategory } from "./BlogCategory";
import { ArticleModule } from "../article/ArticleModule";

@Module({
	imports: [
		TypeOrmModule.forFeature([BlogCategory]),
		ArticleModule,
	],
	providers: [
		CategoryService,
	],
	controllers: [
		CategoryController,
	]
})
export class CategoryModule {}