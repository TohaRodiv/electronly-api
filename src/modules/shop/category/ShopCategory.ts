import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
