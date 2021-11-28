import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product/Product";
import { StatusOrder } from "../status-order/StatusOrder";

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "ФИО", })
	@Column()
	@IsString()
	fio: string;

	@ApiProperty({ title: "Телефон", })
	@Column()
	@IsPhoneNumber("RU")
	tel?: string;

	@ApiProperty({ title: "E-mail", default: "", })
	@Column({default: ""})
	@IsEmail()
	@IsOptional()
	email?: string;

	@ApiProperty({ title: "Комментарий", })
	@Column({default: ""})
	@IsString()
	@IsOptional()
	comment?: string;

	@ApiProperty({ title: "Дата создания", })
	@CreateDateColumn()
	created: Date;

	@ApiProperty({ title: "Дата обновления", })
	@UpdateDateColumn()
	updated: Date;

	@ApiProperty({ title: "Товары", type: () => [Product], })
	@ManyToMany(() => Product,)
	@JoinTable({
		name: "orders_products",
	})
	products: Product[];


	@ApiProperty({ title: "Статус", type: () => StatusOrder, })
	@ManyToOne(() => StatusOrder,)
	status: StatusOrder;
}