import {
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {

  @ApiProperty({
    example: "Rahul Sharma"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Frontend Developer"
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    example: 55000
  })
  @IsNumber()
  salary: number;
}