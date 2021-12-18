import { hash, compare } from 'bcrypt'
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '#modules/config/ConfigService';

@Injectable()
export class EncryptionService {
	constructor(
		@Inject(ConfigService)
		private readonly config: ConfigService
	) { }

	public async hash(plain: string): Promise<string> {
		return hash(plain, this.config.app.hashRounds)
	}

	public async compare(plain: string, encrypted: string): Promise<boolean> {
		return compare(plain, encrypted)
	}
}