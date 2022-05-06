import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/gaurd/jwt-authentication.guard';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import { PostsService } from '../service/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createPosts(@Body() post:CreatePostDto){
      return this.postsService.createPost(post)
  }


  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id:string){
    return this.postsService.getPostById(Number(id))
  }

  @Put(':id')
  replacePost(@Param('id') id:string, @Body() post:UpdatePostDto){
    return this.postsService.replacePost(Number(id),post)
  }

  @Delete(':id')
  deletePost(@Param('id') id:string){
    return this.postsService.deletePost(Number(id))
  } 
}
