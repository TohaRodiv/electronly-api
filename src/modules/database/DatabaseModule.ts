import { ConfigModule } from "#modules/config/ConfigModule";
import { ConfigService } from "#modules/config/ConfigService";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.database,
		}),
	]
})
export class DatabaseModule { }