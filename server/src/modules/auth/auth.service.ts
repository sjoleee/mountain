import { ResponseUsersDto } from './../users/dto/response-users.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseLoginDto } from './dto/response-login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtLogin(user: ResponseUsersDto) {
    const { email, _id, roles, username } = user;
    const payload = { email, sub: _id };
    return {
      id: _id,
      access_token: this.jwtService.sign(payload),
      roles: roles,
      username: username,
    };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
