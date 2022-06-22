import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  create(user: User): Observable<User> {
    return from(this._userRepository.save(user));
  }

  findOne(id: number): Observable<User> {
    return from(this._userRepository.findOneBy({ id }));
  }

  findAll(): Observable<User[]> {
    return from(this._userRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this._userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    return from(this._userRepository.update(id, user));
  }
}
