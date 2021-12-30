import { Controller, Delete, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { FileService } from "./FileService";
import { File } from "./File";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiMultiFile } from "#common/decorators/ApiMultiFile";
import { JwtAuthGuard } from "#common/guards/JwtAuthGuard";
import { TransformFilePathInterceptor } from "#common/interceptors/TransformFilePathInterceptor";

@Controller("/files")
@Crud({
	model: {
		type: File,
	},
	routes: {
		getManyBase: {
			interceptors: [new TransformFilePathInterceptor()],
		},
		getOneBase: {
			interceptors: [new TransformFilePathInterceptor()],
		},
		only: [
			"getManyBase",
			"getOneBase",
		],
	},
})
@ApiTags("Файлы")
// @UseGuards(JwtAuthGuard)
export class FileController implements CrudController<File> {
	constructor(
		public service: FileService,
	) { }

	@Post()
	@UseInterceptors(FilesInterceptor("files"))
	@ApiConsumes("multipart/form-data")
	@ApiMultiFile("files")
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req): Promise<Promise<File>[]> {
		return this.service.createAndSaveMany(files);
	}

	@Patch(":id")
	@UseInterceptors(FileInterceptor("file"))
	@ApiConsumes("multipart/form-data")
	@ApiMultiFile("file")
	updateFile(
		@Param("id") id: number,
		@UploadedFile() file: Express.Multer.File
	): Promise<File> {
		return this.service.updateOneFile(id, file);
	}

	@Delete(":id")
	deleteOneFile(@Param("id") id: number): Promise<File> {
		return this.service.deleteOneFile(id);
	}
}