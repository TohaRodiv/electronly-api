import { File } from "#modules/file/File";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product";

@Entity({ name: "shop-categories" })
export class ShopCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	title: string;

	@ApiProperty({ title: "Активно", default: true, })
	@Column({ default: true })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Товары", type: () => [Product], })
	@OneToMany(() => Product, product => product.category)
	products: Product[];

	@ApiProperty({ title: "Изображение", type: () => [File], format: "image", required: false, })
	@ManyToMany(() => File)
	images: File[]
}
