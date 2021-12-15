import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { userRepository } from './user.Repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private userRepository: userRepository,
    private jwtService: JwtService
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (!(user && await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login failed');
    }
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(`Output: ${JSON.stringify(accessToken)}`)
    return { accessToken };
  }
}
