import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Param
} from "@nestjs/common";

import { EmployeeService } from "./employee.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("employee")
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get()
  getAll(@Req() req: any) {
    return this.service.getAll(req.user.tenantId);
  }

  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.service.create(body, req.user.tenantId);
  }

  @Delete(":id")
  delete(@Param("id") id: string, @Req() req: any) {
    return this.service.delete(id, req.user.tenantId);
  }
}