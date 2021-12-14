import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	@Matches(/^[a-zA-Z0-9]*$/, { // 영어와 숫자만 가능한 유효성 검사
		message: 'password only accepts enflish and number'
	})
	password: string;
}
