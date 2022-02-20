import {Body, Controller, Post, UsePipes, Patch, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {ValidationPipe} from '../shared/validation.pipe';
import {UpdateUsername, UserDTO} from './dto/user.dto';
import {AuthGuard} from '../shared/auth.guard';
import {User} from './user.decorator';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post("register")
  @UsePipes(ValidationPipe)
  register(@Body() data: UserDTO) {
    return this.userService.register(data)
  }

  @Post("login")
  @UsePipes(ValidationPipe)
  login(@Body() data: UserDTO) {
    return this.userService.login(data)
  }

  @Patch("username")
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  changeUsername(
    @User("id") userId: string,
    @Body() usernameData: UpdateUsername
  ) {
    return this.userService.updateUsername(userId, usernameData.username)
  }

}
