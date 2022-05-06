import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from '../controller/posts.controller';
import { PostsService } from '../service/posts.service';
import { PostTable } from '../entity/posts.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PostTable])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
