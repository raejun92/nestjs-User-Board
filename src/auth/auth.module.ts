import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userRepository } from './user.Repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([userRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
