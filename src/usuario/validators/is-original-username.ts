import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint()
export class IsUniqueUsernameConstraint implements ValidatorConstraintInterface  {

  constructor(
    private userService: UserService
  ){}

  validate(username: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    // Lembrar: '!!' pedem pra transformar qualquer valor valido em true; E não válido em false.
    // '!!!' retorna o valor contrario
    return !!!this.userService.findByName(username);
  }

}

export function IsOriginalUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniqueUsernameConstraint,
      });
    };
  }