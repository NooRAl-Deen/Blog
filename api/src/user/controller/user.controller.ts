import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this._userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this._userService.findOne(params.id);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this._userService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param() params): Observable<any> {
    return this._userService.deleteOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params, @Body() user: User): Observable<any> {
    return this._userService.updateOne(params.id, user);
  }

  @Post('login')
  login(@Body() user: User): Observable<Object> {
    return this._userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }
}
