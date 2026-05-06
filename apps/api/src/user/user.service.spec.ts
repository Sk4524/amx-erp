import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers() {
    return [{ id: 1, email: "test@test.com" }];
  }
}