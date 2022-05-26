import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsUniqueUsernameConstraint } from './validators/is-original-username';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService, 
    IsUniqueUsernameConstraint
  ],
})
export class UserModule {}
