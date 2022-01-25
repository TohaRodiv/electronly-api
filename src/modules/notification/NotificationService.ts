import { ISocialService } from "#modules/social/interfaces/ISocialService";

export class NotificationService {
	public async sendMessage(message: string, services: ISocialService[]): Promise<void> {
		services.forEach(service => {
			service.sendMessage(message);
		});
	}
}