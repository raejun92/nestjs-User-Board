import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { userRepository } from './user.Repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: userRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (!(user && await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login failed');
    }
  }
}
