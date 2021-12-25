import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Article } from "../article/Article";
import { File } from "#modules/file/File";

@Entity({ name: "blog-categories" })
export class BlogCategory extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", required: false, default: true, })
	@Column({ default: true, })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Материалы", type: () => [Article], })
	@OneToMany(() => Article, article => article.category)
	@IsOptional()
	articles: Article[];

	@ApiProperty({ title: "Изображение", type: () => [File], format: "image", required: false, })
	@ManyToMany(() => File)
	@JoinTable()
	images: File[];
}