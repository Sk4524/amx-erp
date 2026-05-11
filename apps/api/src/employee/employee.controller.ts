import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
  UseGuards,
  Query
} from "@nestjs/common";

import { EmployeeService } from "./employee.service";

import { JwtAuthGuard } from "../auth/jwt.guard";

import { Roles } from "../auth/roles.decorator";

import { RolesGuard } from "../auth/roles.guard";

import {
  ApiBearerAuth,
  ApiTags
} from "@nestjs/swagger";

import { CreateEmployeeDto } from "./dto/create-employee.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Employees")
@ApiBearerAuth()
@Controller("employee")
export class EmployeeController {

  constructor(
    private service: EmployeeService
  ) {}

  // GET ALL EMPLOYEES
  @Get()
  getAll(
    @Req() req: any,

    @Query("page") page?: string,

    @Query("limit") limit?: string,

    @Query("search") search?: string,
  ) {

    return this.service.getAll(
      req.user.tenantId,
      Number(page) || 1,
      Number(limit) || 10,
      search || "",
    );
  }

  // CREATE EMPLOYEE
  @Post()
  @Roles("ADMIN")
  create(
    @Body() body: CreateEmployeeDto,
    @Req() req: any
  ) {

    return this.service.create(
      body,
      req.user.tenantId
    );
  }

  // DELETE EMPLOYEE
  @Delete(":id")
  @Roles("ADMIN")
  delete(
    @Param("id") id: string,
    @Req() req: any
  ) {

    return this.service.delete(
      id,
      req.user.tenantId
    );
  }

  // UPDATE EMPLOYEE
  @Put(":id")
  @Roles("ADMIN")
  update(
    @Param("id") id: string,

    @Body() body: CreateEmployeeDto,

    @Req() req: any
  ) {

    return this.service.update(
      id,
      body,
      req.user.tenantId
    );
  }
}