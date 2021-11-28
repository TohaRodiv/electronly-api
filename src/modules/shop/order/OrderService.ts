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

		return await this.repo.save(order);
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
}