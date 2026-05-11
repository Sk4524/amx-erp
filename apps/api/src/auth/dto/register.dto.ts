import {
  IsEmail,
  IsNotEmpty,
  IsString
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
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "AMX Corporation"
  })
  @IsString()
  @IsNotEmpty()
  tenantName: string;

  @ApiProperty({
    example: "ADMIN"
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}