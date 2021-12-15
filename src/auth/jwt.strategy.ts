import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/auth.entity';
import { userRepository } from './user.Repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private userRepository: userRepository
	) {
		// 토큰이 유효한지 확인
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'jwtsecret'
		})
	}

	// 토큰이 유효한지 확인이 되면 실행 됨, Guard(AuthGuard())실행에서 실행
	async validate(payload: any) {
		const { username } = payload;
		const user: User = await this.userRepository.findOne({ username });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
