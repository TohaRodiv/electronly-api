import {forwardRef, Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";
import { BlogCategory } from "./BlogCategory";
import { ArticleModule } from "../article/ArticleModule";
import { FileModule } from "#modules/file/FileModule";

@Module({
	imports: [
		TypeOrmModule.forFeature([BlogCategory]),
		forwardRef(() => ArticleModule),
		FileModule,
	],
	exports: [
		CategoryService,
	],
	providers: [
		CategoryService,
	],
	controllers: [
		CategoryController,
	]
})
export class CategoryModule {}