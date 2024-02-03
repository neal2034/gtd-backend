import { IsBoolean, IsString } from "class-validator";
import { BaseInDto } from "../base/BaseInDto";

export class ITodoAddDto extends BaseInDto{
  @IsString()
  name:string;
  @IsBoolean()
  status:boolean;
}
