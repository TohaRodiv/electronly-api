import { Article } from "#modules/blog/article/Article";
import { BlogCategory } from "#modules/blog/category/BlogCategory";
import { File } from "#modules/file/File";
import { ShopCategory } from "#modules/shop/category/ShopCategory";
import { Order } from "#modules/shop/order/Order";
import { ProductImage } from "#modules/shop/product-image/ProductImage";
import { Product } from "#modules/shop/product/Product";
import { Banner } from "#modules/shop/promo/banner/Banner";
import { StatusOrder } from "#modules/shop/status-order/StatusOrder";
import { User } from "#modules/user/User";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const DatabaseConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: false,
	migrationsRun: true,
	entities: [
		User,
		Article,
		BlogCategory,
		Product,
		ShopCategory,
		Order,
		Banner,
		StatusOrder,
		// ProductImage,
		File,
	],
	migrations: [
		"src/_db/migrations/**/*.ts"
	],
	cli: {
		entitiesDir: "src/",
		migrationsDir: "src/_db/migrations",
	}
};

export default {
	...DatabaseConfig,
	host: "localhost",
};