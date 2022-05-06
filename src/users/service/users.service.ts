import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/createUser.dto";
import { User } from "../entity/user.entity";

@Injectable()
export class UsersService{
    static getByEmail(string) {
      throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    async getByEmail(email:string){
        const user = await this.usersRepository.findOne({email})
        if (user){
            return user
        }
        throw new HttpException('user not found -  usersService - getbyEmail',HttpStatus.NOT_FOUND)
    }

    async getById(id:number){
        const user = await this.usersRepository.findOne({id})
        if (user){
            return user
        }
        throw new HttpException('user not found - usersService - getbyId',HttpStatus.NOT_FOUND)
    }

    async createUser(userData: CreateUserDto){
        const newUser = await this.usersRepository.create(userData)
        await this.usersRepository.save(newUser)
        return newUser
    }
    
}