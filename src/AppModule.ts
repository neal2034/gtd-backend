import { Module, ValidationPipe } from "@nestjs/common";
import { TodoModule } from "./module/TodoModule";
import { AppConfigModule } from "./module/AppConfigModule";
import { DbOrmConfigModule } from "./module/DbOrmConfigModule";
import { GlobalExceptionFilter } from "./config/filter/GlobalExceptionFilter";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseTransformInterceptor } from "./inteceptor/ResponseTransformInterceptor";
import { plainToClass } from "class-transformer";
import { IUserAddDto } from "./dto/user/IUserAddDto";
import { UserModule } from "./module/UserModule";
import { UserService } from "./service/UserService";
import { AuthModule } from "./module/AuthModule";
import { JwtAuthGuard } from "./config/auth/JwtAuthGuard";

@Module({
  imports: [TodoModule,AppConfigModule,DbOrmConfigModule,UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass:GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:ResponseTransformInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {
  constructor(private readonly userService:UserService) {
  }

  async onModuleInit(){
    const dto = {username:"neal", password:"823da4223e46ec671a10ea13d7823534"}
    const existUser = await this.userService.getUserByName(dto.username);

    if(!existUser){
      const addDto = plainToClass(IUserAddDto, dto);
      await this.userService.addUser(addDto)
    }

  }
}
