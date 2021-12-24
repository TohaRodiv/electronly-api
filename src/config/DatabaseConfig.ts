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
	host: process.env.DB_HOST || "localhost",
	port: +process.env.DB_PORT || 3306,
	username: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "electronly",
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
	synchronize: false,
	migrations: [
		"src/migration/**/*.ts"
	],
	subscribers: [
		"src/subscriber/**/*.ts"
	],
	cli: {
		entitiesDir: "src/",
		migrationsDir: "src/migration",
		subscribersDir: "src/subscriber"
	}
};

export default {
	...DatabaseConfig,
	url: `postgres://postgres@localhost:${DatabaseConfig.port}/${DatabaseConfig.database}`
};