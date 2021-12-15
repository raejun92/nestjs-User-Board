import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userRepository } from './user.Repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([userRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jwtsecret', // 토큰을 만들기 위한 secret
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy], // JwtStrategy는 auth 모듈에서 사용하기 위함
  exports: [JwtStrategy, PassportModule] // PassportModule는 다른 모듈에서도 사용하기 위함

})
export class AuthModule {}
