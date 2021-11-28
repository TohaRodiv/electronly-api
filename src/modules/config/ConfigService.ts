import {
	AppConfig,
	DatabaseConfig,
	SwaggerConfig,
	JwtConfig,
	FileStorageConfig,
} from "#config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
	public get app (): typeof AppConfig {
		return AppConfig;
	}

	public get database (): typeof DatabaseConfig {
		return DatabaseConfig;
	}

	public get swagger(): typeof SwaggerConfig {
		return SwaggerConfig;
	}

	public get jwt(): typeof JwtConfig {
		return JwtConfig;
	}

	public get fileStorage(): typeof FileStorageConfig {
		return FileStorageConfig;
	}
}