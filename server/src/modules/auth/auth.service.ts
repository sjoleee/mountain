import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtLogin(user: any) {
    const { email, _id } = user;
    const payload = { email, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
