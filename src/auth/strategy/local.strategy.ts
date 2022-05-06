import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../service/auth.service';
import { User } from '../../users/entity/user.entity';
import { MaxKey } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: any, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}

// for authentication a user we need to use passport library. this process is called strategy and we have to Make 
// our own local stratey extending passport Strategy. local stragegy needs username and password in order to verify and here 
// we user email as usernmae field.

// once we are done with local strategy we need to authentication module to use passport. like below:
// providers: [AuthenticationService, LocalStrategy],
// then we need to controller and we shd use gaurd in our controller, its responsible to determine whether route handlers handle
// the requests or not. 
// we create our own local authentication gaurd same as our local strategy by extending it to gaurd.

// we attached the data of the user to request by extending it and making user interface.

// jwt is a string we use it prevent making requests to access again and again (login)

// to read tokens from cookies we have to create a second strategy called jwt strategy.

//  jwt authentication gaurd is for users to get authenticated while accessing the site or anything