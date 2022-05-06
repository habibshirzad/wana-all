import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { User } from "../entity/user.entity"
import { UsersService } from "./users.service"



describe('the UsersService',() =>{
    let usersService : UsersService
    let findOne : jest.Mock
    let save: jest.Mock
    let create: jest.Mock

    beforeEach(async () => {
        findOne = jest.fn()
        save = jest.fn()
        create = jest.fn()

        const module = await Test.createTestingModule({
            providers:[
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue:{
                        findOne,
                        save,
                        create
                    }
                }
            ]
        }).compile();
        usersService  = await module.get(UsersService)                                              
    })

    // create and save user
    describe('create and save a user', () => {
        let user;
        beforeEach(() => {
          user = {
            id: 1,
            email: 'h@gmail.com',
            name: 'h',
            password: 'hhh',
          }
          create.mockReturnValue(user);
          save.mockReturnValue(user);
          // save.mockReturnValue(true); cuz its nt returning anything but the user.thats why we can write true as well .


        })
        it('create and save the user', async () => {
          const fetchedUser = await usersService.createUser({
              email: 'h@gmail.com',
              name: 'h',
              password: 'hhh'
            });
          expect(fetchedUser).toEqual(user);
        })
      })


    // get by email
    describe(' Finding a user by email', () => {

        describe('if the user is matched', () => {
          let user: User;
          beforeEach(() => {
            user = new User();
            findOne.mockReturnValue(Promise.resolve(user));
          })
          it('should return the user', async () => {
            const fetchedUser = await usersService.getByEmail('test@test.com');
            expect(fetchedUser).toEqual(user);
          })
        })

        describe('if the user is not matched', () => {
          beforeEach(() => {
            findOne.mockReturnValue(undefined);
          })
          it('should throw an error', async () => {
            await expect(usersService.getByEmail('test@test.com')).rejects.toThrow();
          })
        })
      })

      // not sure if this one is necessary
      // describe('and the user is not matched', () => {
      //   beforeEach(() => {
      //     findOne.mockReturnValue(undefined);
      //   })
      //   it('should throw an error', async () => {
      //     await expect(usersService.getByEmail('test@test.com')).rejects.toThrow();
      //   })
      // })

});

    