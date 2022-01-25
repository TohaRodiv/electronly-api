export interface ISocialService {
	sendMessage(message: string): Promise<void>;
}