import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../article/Article";

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
	articles: Article[];
}