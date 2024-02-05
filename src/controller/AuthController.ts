import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { ILoginDto } from "../dto/auth/ILoginDto";
import { PublicRouter } from "../config/auth/PublicRouterDecorator";
import { IRefreshTokenDto } from "../dto/auth/IRefreshTokenDto";
import { IRegisterDto } from "src/dto/auth/IRegisterDto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRouter()
  @Post("login")
  async login(@Body() loginDto: ILoginDto) {
    return await this.authService.login(loginDto);
  }

  @PublicRouter()
  @Post("refresh")
  async refreshToken(@Body() refreshTokenDto: IRefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }

  @PublicRouter()
  @Post("register")
  async register(@Body() registerDto: IRegisterDto) {
    return await this.authService.register(registerDto);
  }
}
