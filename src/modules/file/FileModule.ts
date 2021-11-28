import { ConfigModule } from "#modules/config/ConfigModule";
import { ConfigService } from "#modules/config/ConfigService";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { File } from "./File";
import { FileController } from "./FileController";
import { FileService } from "./FileService";
import type { Request } from "express";

@Module({
	imports: [
		TypeOrmModule.forFeature([File]),
		MulterModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				storage: diskStorage({
					destination: config.fileStorage.destination,
					filename: (
						req: Request,
						file: Express.Multer.File,
						callback: (error: Error | null, filename: string) => void
					) => callback(null, config.fileStorage.getFileName(file)),
				}),
				limits: {
					fieldSize: config.fileStorage.limits.fieldSize,
				}
			}),
		}),
		ConfigModule,
	],
	exports: [
		FileService,
	],
	providers: [
		ConfigService,
		FileService,
	],
	controllers: [
		FileController,
	],
})
export class FileModule { }
