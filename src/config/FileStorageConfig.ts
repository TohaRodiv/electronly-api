import { extname, join as pathJoin } from "path";
import { v4 as uuidv4 } from "uuid";

const uploadDir = pathJoin(process.env.UPLOAD_DIR || "upload");

export const FileStorageConfig = {
	uploadDir,
	destination: pathJoin(process.env.PWD, uploadDir),
	limits: {
		fieldSize: 1024 * 1024 * 10, // 10 MB
	},
	getFileName: (file: Express.Multer.File): string =>
		`${uuidv4()}${extname(file.originalname)}`,
	webUploadPath: "/upload",
};