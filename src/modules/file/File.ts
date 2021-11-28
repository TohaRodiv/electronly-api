import { Product } from "#modules/shop/product/Product";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "files" })
export class File extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@Column()
	@IsString()
	@ApiProperty({ title: "Путь" })
	path: string;

	@Column()
	@IsString()
	@ApiProperty({ title: "Тип" })
	mimetype: string;

	@Column()
	@IsNumber()
	@ApiProperty({ title: "Размер" })
	size: number;

	@ApiProperty({ title: "Товары", type: () => Product, })
	@ManyToOne(() => Product, product => product.images)
	product: Product;
}