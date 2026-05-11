import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Req,
  Query,
  UseGuards,
} from "@nestjs/common";

import { InventoryService } from "./inventory.service";

import { JwtAuthGuard } from "../auth/jwt.guard";

import { RolesGuard } from "../auth/roles.guard";

import { Roles } from "../auth/roles.decorator";

import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

@UseGuards(
  JwtAuthGuard,
  RolesGuard
)

@ApiTags("Inventory")

@ApiBearerAuth()

@Controller("inventory")
export class InventoryController {

  constructor(
    private service: InventoryService
  ) {}

  // GET
  @Get()
  getAll(
    @Req() req: any,
    @Query("search") search?: string
  ) {

    return this.service.getAll(
      req.user.tenantId,
      search || ""
    );
  }

  // CREATE
  @Post()
  @Roles("ADMIN")
  create(
    @Body() body: any,
    @Req() req: any
  ) {

    return this.service.create(
      body,
      req.user.tenantId
    );
  }

  // UPDATE
  @Put(":id")
  @Roles("ADMIN")
  update(
    @Param("id") id: string,
    @Body() body: any
  ) {

    return this.service.update(
      id,
      body
    );
  }

  // DELETE
  @Delete(":id")
  @Roles("ADMIN")
  delete(
    @Param("id") id: string
  ) {

    return this.service.delete(id);
  }
}