import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
config();
import { AppModule } from "#modules/app/AppModule";
import { ConfigService } from "#modules/config/ConfigService";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { static as staticExpress } from "express";
import { NestExpressApplication } from "@nestjs/platform-express";

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	  });

	/**
	 * TODO: Путь до папки upload брать из config-сервиса
	 */
	app.useStaticAssets(configService.fileStorage.destination);
	app.use(configService.fileStorage.webUploadPath, staticExpress(configService.fileStorage.destination));
	app.useStaticAssets(configService.fileStorage.destination);


	app.useGlobalPipes(new ValidationPipe());

	const swaggerConfig = new DocumentBuilder()
		.setTitle(configService.swagger.title)
		.setDescription(configService.swagger.description)
		.setVersion(configService.swagger.version)
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup(configService.swagger.apiUrl, app, document);

	await app.listen(configService.app.port);
})();