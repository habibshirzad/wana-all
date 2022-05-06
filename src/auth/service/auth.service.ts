import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/service/users.service";
import {RegisterDto} from "../dto/registerDto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import TokenPayload from '../tokenPayload.interface'

@Injectable()
export class AuthenticationService{
    getCookieWithJwtAccessToken(id: number) {
        throw new Error('Method not implemented.');
    }
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    // registration
    public async register(registrationData: RegisterDto){
        const hashedPassword = await bcrypt.hash(registrationData.password,10);
        try{
            const createdUser = await this.usersService.createUser({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined
            return createdUser
        }catch(error){
            if (error?.code === PostgresErrorCode.UniqueViolation){
                throw new HttpException('User with that email already exists - authSer - register.', HttpStatus.BAD_REQUEST);
            }
        throw new HttpException('Something went wrong - - authSer - register.', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    // login
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.usersService.getByEmail(email);
          console.log(user)
          await this.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided- login - getAuth-login-authSer', HttpStatus.BAD_REQUEST);
        }
      }
       
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided. verify pass -authSer', HttpStatus.BAD_REQUEST);
        }
      }
      // it generates cookies when the user logs in, to be used later.
    public getCookieWithJwtToken(userId: number) {
      const payload: TokenPayload = { userId };
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
    // logout
    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }





}
        
    
