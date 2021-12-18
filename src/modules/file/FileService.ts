import { ConfigService } from "#modules/config/ConfigService";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { basename } from "path";
import { Repository } from "typeorm";
import { File } from "./File";
import { promises as fs } from "fs";

@Injectable()
export class FileService extends TypeOrmCrudService<File> {
	constructor(
		@InjectRepository(File)
		protected repo: Repository<File>,
		@Inject(ConfigService)
		protected configService: ConfigService,
	) {
		super(repo);
	}

	public async findByIds(ids: number[]): Promise<File[]> {
		return await this.repo.findByIds(ids);
	}

	public async createAndSaveOne(dto: Express.Multer.File): Promise<File> {
		let file = this.repo.create();

		file = this.setFieldsFile(dto, file);

		return await this.repo.save(file);
	}

	public async createAndSaveMany(filesDto: Array<Express.Multer.File>): Promise<Promise<File>[]> {
		const files = [];

		for (const dto of filesDto) {
			files.push(await this.createAndSaveOne(dto));
		}

		return files;
	}

	public async updateOneFile(id: number, dto: Express.Multer.File): Promise<File> {
		let file = await this.repo.findOne(id);

		if (!file) {
			throw new NotFoundException(`File with id ${id} not found!`);
		}

		await this.deleteFile(basename(file.path));

		file = this.setFieldsFile(dto, file);

		return await this.repo.save(file);
	}

	public async deleteOneFile(id: number): Promise<File> {
		const file = await this.repo.findOne(id);

		if (!file) {
			throw new NotFoundException(`File with id ${id} not found!`);
		}
		
		await this.deleteFile(basename(file.path));

		return await this.repo.remove(file);
	}

	protected setFieldsFile(dto: Express.Multer.File, file: File): File {
		console.log(dto);
		file.path = `${this.configService.fileStorage.uploadDir}/${dto.filename}`;
		file.mimetype = dto.mimetype;
		file.size = dto.size;

		return file;
	}

	protected async deleteFile(filename: string): Promise<void> {
		try {
			await fs.unlink(`${this.configService.fileStorage.destination}/${filename}`);
		} catch (err) {
			// throw new NotFoundException(`Cannot remove file ${filename}, error: ${err.message}`);
			// TODO: Добавить логирование для ошибок удаления
		}
	}
}