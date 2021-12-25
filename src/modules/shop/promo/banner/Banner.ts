import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "#modules/file/File";

@Entity({ name: "banners" })
export class Banner extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@ApiProperty({ title: "Название", })
	@Column()
	@IsString()
	title: string;

	@ApiProperty({ title: "Подзаголовок", })
	@Column()
	@IsString()
	subtitle: string;

	@ApiProperty({ title: "Активен", })
	@Column({default: false})
	@IsBoolean()
	active: boolean;

	@ApiProperty({ title: "Изображение", type: () => [File], format: "image", })
	@ManyToMany(() => File)
	@JoinTable()
	images: File;
}