import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/auth.entity';

export const GetUser = createParamDecorator((data, context: ExecutionContext): User => {
	const req = context.switchToHttp().getRequest(); // req으로 받아온 모든 것

	return req.user;
});