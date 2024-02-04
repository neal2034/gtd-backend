import { IsDate, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { BaseInDto } from "../base/BaseInDto";

export class ITodoAddDto extends BaseInDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsOptional()
  due: Date;
}
