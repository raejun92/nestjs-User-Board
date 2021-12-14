import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { userRepository } from './user.Repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: userRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
