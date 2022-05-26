import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "src/commom/core/http/nest-response";
import { NestResponseBuilder } from "src/commom/core/http/nest-response-builder";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    
    constructor(
        private userService: UserService
    ){}
    
    @Post()
    public create(@Body() user: User): NestResponse{
        const userCreated = this.userService.create(user);

        return new NestResponseBuilder()
        .setStatus(HttpStatus.CREATED)
        .setHeaders({
            'Location': `/users/${userCreated.username}`
        })
        .setBody(userCreated)
        .build();
    }


    @Get(':username')
    public findByuserName(@Param('username') username: string): User{
        const user = this.userService.findByName(username);

        if(!user){
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'User not found!'
            });
        }
        return user;
    }
}