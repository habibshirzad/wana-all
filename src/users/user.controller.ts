import { Body, Controller, Get, Query } from "@nestjs/common";
import { UsersService } from "./service/users.service";

@Controller('users')
export default class UserController{
    constructor(
        private readonly userService: UsersService
    ){}

    @Get(':id?')
    async getById(@Query('id') id:number){
        const user = await this.userService.getById(id)
        if (!user){
            return 'user not found - getbyID - user controller'
        }
        return user
    }



}
