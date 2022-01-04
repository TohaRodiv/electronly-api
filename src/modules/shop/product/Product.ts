import { File } from "#modules/file/File";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopCategory } from "../category/ShopCategory";

@Entity({ name: "products" })
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Наименование", })
	@Column()
	@IsString()
	name: string;

	@ApiProperty({ title: "Описание", format: "text", })
	@Column({ type: "text", default: "", })
	@IsString()
	description: string;

	@ApiProperty({ title: "Закупочная цена", required: false, default: null, })
	@Column({ default: null, })
	@IsNumber()
	purchase_price: number;

	@ApiProperty({ title: "Цена", })
	@Column({ default: null, })
	@IsNumber()
	price: number;

	@ApiProperty({ title: "Зачеркнутая цена", required: false, default: null, })
	@Column({ default: null, })
	@IsNumber()
	crossed_price: number;

	@ApiProperty({ title: "Кол-во", default: null, })
	@Column({ default: null })
	@IsNumber()
	count: number;

	@ApiProperty({ title: "Наличие", default: true, })
	@Column({ default: true, })
	@IsBoolean()
	available: boolean;

	@ApiProperty({ title: "Активен", default: true, })
	@Column({ default: true })
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Категория", type: () => ShopCategory, })
	@ManyToOne(() => ShopCategory, category => category.products)
	category: ShopCategory;

	@ApiProperty({ title: "Изображения", type: () => [File], format: "images", })
	@ManyToMany(() => File)
	@JoinTable()
	images: File[];
}