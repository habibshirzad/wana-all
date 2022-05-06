import { Module } from '@nestjs/common';
import { AuthenticationService } from '../service/auth.service';
import { UsersModule } from '../../users/module/users.module';
import { AuthenticationController } from '../controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from '../strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../strategy/local.strategy';
 
@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),


],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}