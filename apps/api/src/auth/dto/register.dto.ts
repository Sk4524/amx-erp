import {
  IsEmail,
  IsNotEmpty,
  MinLength
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

  @ApiProperty({
    example: "admin@erp.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456"
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "AMX Corporation"
  })
  @IsNotEmpty()
  tenantName: string;
}