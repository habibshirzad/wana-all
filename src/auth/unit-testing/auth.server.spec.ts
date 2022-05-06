import { AuthenticationService } from '../service/auth.service';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../users/module/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../database/database.module';
import * as Joi from '@hapi/joi';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/service/users.service';
 

const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600'
    }
  }
}
const mockedJwtService = {
  sign: () => ''
}

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let createUser: jest.Mock;
  let getByEmail: jest.Mock;


  beforeEach(async () => {
    createUser = jest.fn()
    getByEmail = jest.fn()

    const module = await Test.createTestingModule({
      
      providers: [
        AuthenticationService,

        {
          provide: UsersService,
          useValue: {createUser,getByEmail}

        },
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
       
       
      ],
    }).compile();
    authenticationService = await module.get<AuthenticationService>(AuthenticationService);
  })

  describe('while creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })
  
  // register
  describe('regster ',() => {
    let user;
    beforeEach(() => {
      user = {
        id : 1,
        email: 'h@gmail.com',
        name: 'h',
        password: 'hhh',
      }
      createUser.mockReturnValue(user)
      
    })
    it('register a user', async () => {
      const newUser = await authenticationService.register({
        email: 'h@gmail.com',
        name: 'h',
        password: 'hhh'
      });
      expect(newUser).toEqual(user)
    })
  })

  // login
  describe('login ',() => {
    let user;
    beforeEach(async () => {
      user = {
        email: 'h@gmail.com',
        password: await bcrypt.hash('hhh', 10),
      }
      getByEmail.mockReturnValue(user)
      
    })
    it('verify and logged the use in', async () => {
      const newUser = await authenticationService.getAuthenticatedUser(
        'h@gmail.com',
        'hhh'
      );
      expect(newUser).toEqual(user)
    })
  })

})













