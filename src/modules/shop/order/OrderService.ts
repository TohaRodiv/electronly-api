import { NotificationService } from "#modules/notification/NotificationService";
import { TelegramService } from "#modules/social/telegram/TelegramService";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../product/ProductService";
import { StatusOrderService } from "../status-order/StatusOrderService";
import { CreateOrderDTO } from "./dto/CreateOrderDTO";
import { UpdateOrderDTO } from "./dto/UpdateOrderDTO";
import { Order } from "./Order";

@Injectable()
export class 
OrderService extends TypeOrmCrudService<Order> {
	constructor(
		@InjectRepository(Order)
		protected repo: Repository<Order>,

		@Inject(ProductService)
		protected productService: ProductService,

		@Inject(StatusOrderService)
		protected statusOrderService: StatusOrderService,

		@Inject(TelegramService)
		protected telegramService: TelegramService,

		@Inject(NotificationService)
		protected notificationService: NotificationService,
	) {
		super(repo);
	}

	/**
	 * 
	 * @deprecated
	 * @param relations 
	 * @returns 
	 */
	public async findByRelation(relations: string[]): Promise<Order[]> {
		return await this.repo.find({relations});
	}

	public async findByIds(ids: number[]): Promise<Order[]> {
		return await this.repo.findByIds(ids);
	}

	public async createAndSaveOne(dto: CreateOrderDTO): Promise<Order> {
		const {
			products,
			status,
			...fields
		} = dto;

		const order = this.repo.create(fields);

		if (products) {
			order.products = await this.productService.findByIds(products);
		}

		if (status) {
			order.status = await this.statusOrderService.findById(status);
		}

		const savedOrder = await this.repo.save(order);

		this.notificate(savedOrder);

		return savedOrder;
	}

	public async update(id: number, dto: UpdateOrderDTO): Promise<Order> {
		const {
			products,
			status,
			...fields
		} = dto;

		const order = await this.repo.findOne(id);

		for(const orderField in order) {
			if(orderField in fields) {
				order[orderField] = fields[orderField];
			}
		}

		if (products) {
			order.products = await this.productService.findByIds(products);
		}

		if (status) {
			order.status = await this.statusOrderService.findById(status);
		}

		return await this.repo.save(order);

	}

	protected async notificate(order: Order) {

		const head = `Новая заявка №${order.id}`;
		let fioWithContacts = `<b>${order.fio ?? "(Клиент без имени)"}: ${order.tel}</b>`;
		
		if (order.email) {
			fioWithContacts += `, ${order.email}`;	
		}

		let products = ``;

		if (order.products.length > 0) {
			products = order.products.map(product => (`${product.name} - ${product.price}`)).join(",")
		}

		this.notificationService.sendFormatMessage({
			head,
			body: `${fioWithContacts}${products}`,
		}, [this.telegramService]);
	}
}