import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { BaseInDto } from "../base/BaseInDto";

export class ITodoEditDto extends BaseInDto {
  @IsInt()
  id: number;
  @IsString()
  @IsOptional()
  name?: string;
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
