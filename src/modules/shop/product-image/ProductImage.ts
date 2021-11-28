import { File } from "#modules/file/File";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product";

@Entity()
export class ProductImage extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "URL" })
	@Column()
	@IsString()
	url: string;

	// @ApiProperty({ title: "Товар", type: () => Product, })
	// @ManyToOne(() => Product, product => product.images)
	// product: Product;

	// @ApiProperty({ title: "Файл", type: () => File, })
	// @ManyToOne(() => File)
	// file: File;
}