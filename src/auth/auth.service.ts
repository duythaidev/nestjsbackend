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

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null; // Ko thấy thì trả về null
  }

  async loginJWT(user: any) {
    const payload = { username: user.username, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
       ...payload
    };
  }

  async login(email: string, pass: string,): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { _id: user._id, username: user.username }
    const access_token = await this.jwtService.signAsync(payload)

    return {
      access_token, ...payload
    };
  }
}
