import { ISocialService } from "#modules/social/interfaces/ISocialService";

type TFormatMessage = {
	head: string
	body?: string
}

export class NotificationService {
	public async sendMessage(message: string, services: ISocialService[]): Promise<void> {
		services.forEach(service => {
			service.sendMessage(message);
		});
	}

	public async sendFormatMessage(message: TFormatMessage, services: ISocialService[]): Promise<void> {
		this.sendMessage(`<b>${message.head}</b>${message.body ?? ""}`, services);
	}
}