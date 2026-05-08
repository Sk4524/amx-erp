import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
  UseGuards
} from "@nestjs/common";

import { EmployeeService } from "./employee.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@UseGuards(JwtAuthGuard)
@ApiTags("Employees")
@ApiBearerAuth()
@Controller("employee")
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get()
  getAll(@Req() req: any) {
    return this.service.getAll(req.user.tenantId);
  }

  @Post()
  create(@Body() body: CreateEmployeeDto, @Req() req: any) {
    return this.service.create(body, req.user.tenantId);
  }

  @Delete(":id")
  delete(@Param("id") id: string, @Req() req: any) {
    return this.service.delete(id, req.user.tenantId);
  }
  
  @Put(":id")
update(
  @Param("id") id: string,
  @Body() body: any,
  @Req() req: any
) {
  return this.service.update(id, body, req.user.tenantId);
 }
}