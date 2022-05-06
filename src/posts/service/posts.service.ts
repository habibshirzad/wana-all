import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "../dto/createPost.dto";
import { UpdatePostDto } from "../dto/updatePost.dto";
import { PostTable } from "../entity/posts.entity";


@Injectable()
export class PostsService{
    constructor(
        @InjectRepository(PostTable)
        private readonly postsRepository: Repository<PostTable>
    ){}

    // create post
    async createPost(post:CreatePostDto){
        const newPost = await this.postsRepository.create(post)
        console.log(newPost)
        await this.postsRepository.save(newPost)
        return newPost
    }

    // get all
    getAllPosts(){
        return this.postsRepository.find()
    }

    // get by Id
    async getPostById(id: number){
        const post = this.postsRepository.findOne(id)
        if (post){
            return post
        }
        throw new HttpException('post not found',HttpStatus.NOT_FOUND)
    }

    // update
   async replacePost(id:number,post:UpdatePostDto){
        await this.postsRepository.update(id,post)
        const updatedPost = await this.postsRepository.findOne(id)
        if (updatedPost){
            return updatedPost
        } 
        throw new HttpException('post not found', HttpStatus.NOT_FOUND)
    }
    
    // delete
    async deletePost(id: number){
        const deletedPost = await this.postsRepository.delete(id)
        if (!deletedPost.affected){
            throw new HttpException('post not found', HttpStatus.NOT_FOUND)
        }

    }
}
