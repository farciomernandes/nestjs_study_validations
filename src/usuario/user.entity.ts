import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsOriginalUsername } from "./validators/is-original-username";

export class User {
    id: number;

    @IsOriginalUsername()
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsEmail()
    email: string;

    @Exclude({ //Decorator para excluir essa coluna
        toPlainOnly: true //atributo que avisa que é só no momento de response
    })
    @IsNotEmpty({
        message:'Fullname required!'
    })
    password: string;

    @IsNotEmpty()
    fullname: string;

    joingDate: Date;
}