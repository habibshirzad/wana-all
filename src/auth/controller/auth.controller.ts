import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthenticationService } from '../service/auth.service';
import {RegisterDto} from '../dto/registerDto';
import RequestWithUser from '../interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from '../gaurd/localAuthentication.guard';
import JwtAuthenticationGuard from '../gaurd/jwt-authentication.guard';
import { Response } from 'express'; 


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
 

  // register
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }
  

  // login
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
      return user;
  }


  // logout
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
      response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut())
      return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
  // const user = request.user;
  // user.password = undefined;   // if u uncomment it it will show the password.
  return request.user
  }

}