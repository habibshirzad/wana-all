import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import UserController from '../user.controller';
 
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]     //remember tht we didnt export the postsService why??
})
export class UsersModule {}