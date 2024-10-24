import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_STATUS, Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Thư viện để mã hóa mật khẩu
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { UserPlatformService } from 'src/userplatform/userplatform.service';
import { PLATFORM } from 'src/userplatform/entities/userplatform.entity';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userPlatformService: UserPlatformService,
  ) {
    this.client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_SECRET,
      process.env.YOUR_REDIRECT_URI,
    );
  }

  async handleCallbackYTB(userId, code) {
      const user = await this.userService.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) throw new BadRequestException('User not found !');

      const { tokens } = await this.client.getToken(code);
      const accessToken = tokens.access_token;
      const refreshToken = tokens.refresh_token;

      const userInfo = await this.getUserInfo(accessToken);
      const channelInfo = await this.getChannelInfo(accessToken);

      const checkExists = await this.userPlatformService.find({
        where: {
          platform: PLATFORM.YOUTUBE,
          sourceId: userInfo.sub,
          userId: user.id,
        },
      });

      if (checkExists) throw new BadRequestException('User platform exist !');


      const data = {
        userId: user.id,
        platform: PLATFORM.YOUTUBE,
        accessToken,
        refreshToken,
        sourceId: userInfo.sub,
        firstName: userInfo.family_name,
        lastName: userInfo.given_name,
        picture: userInfo.picture,
        subscriber: +(channelInfo?.statistics?.subscriberCount || 0),
        channelName: channelInfo?.snippet?.title,
        viewCount: +(channelInfo?.statistics?.viewCount || 0),
        videoCount : +(channelInfo?.statistics?.videoCount || 0),
      };

      return await this.userPlatformService.create(data as any);
  }

  private async getUserInfo(accessToken: string) {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  }

  getChannelInfo = async (accessToken) => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            part: 'snippet,statistics', // Lấy thông tin về kênh
            mine: true, // Chỉ lấy thông tin kênh của người dùng
          },
        },
      );

      const channelInfo = response.data.items[0]; // Lấy kênh đầu tiên (kênh của người dùng)
      return channelInfo;
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      return {}
    }
  };

  async handleRegister(data: RegisterDto) {
    const { email, firstName, lastName, password, rePassword } = data;

    if (password !== rePassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const existingUser = await this.userService.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      status: USER_STATUS.ACTIVE,
      roleId: 1,
    };

    await this.userService.create(newUser);

    return {
      isSuccess: true,
      message: 'User successfully registered',
    };
  }

  async handleLogin(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: Users }> {
    const { email, password } = loginDto;

    // Kiểm tra người dùng có tồn tại hay không
    const user = await this.userService.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Kiểm tra mật khẩu có đúng không
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Tạo JWT payload
    const payload = { email: user.email, sub: user.id };

    // Tạo access token
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }
}
