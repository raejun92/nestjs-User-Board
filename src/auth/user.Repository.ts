import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';

@EntityRepository(User)
export class userRepository extends Repository<User> {
	private logger = new Logger('User Repository');
	async createUser(authCredentialsDto: AuthCredentialsDto) {
		const { username, password } = authCredentialsDto;
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = this.create({ username, password: hashedPassword });
		
		// try catch로 유저 중복시 예외처리(try catch가 없으면 500 에러)
		try {
			await this.save(user);
		} catch (err) {
			this.logger.debug(`err: ${err.code}`);
	
			if (err.code === '23505') {
				throw new ConflictException('Existing username');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}