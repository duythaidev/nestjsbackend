import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // Guard call this service
  async validateUser(email: string, pass: string): Promise<any> {
    // Tìm user trong db
    const user = await this.usersService.findUserByEmail(email);
    console.log("user: ", user)
    if (user && user.password === pass) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null; // Ko thấy thì trả về null
  }

  async loginJWT(user: any) {
    const payload = { username: user.username, _id: user._id };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
      ...payload
    };
  }
}