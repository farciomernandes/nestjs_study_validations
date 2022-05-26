import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    
    private users: Array<User> = [];
    
    public create(user): User{
        this.users.push(user);
        return user;
    }

    public findByName(name: string): User{
        return this.users.find(user => user.username === name);
    }
}