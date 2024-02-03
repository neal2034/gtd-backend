import { IsEmail, IsString, MinLength } from "class-validator";
import { BaseInDto } from "../base/BaseInDto";

export class IRegisterDto extends BaseInDto {
  @IsString()
  @IsEmail()
  username: string;
  @IsString()
  @MinLength(6)
  password: string;
}
