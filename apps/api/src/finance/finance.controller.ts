import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  Query,
  UseGuards,
} from "@nestjs/common";

import { FinanceService } from "./finance.service";

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

@ApiTags("Finance")

@ApiBearerAuth()

@Controller("finance")
export class FinanceController {

  constructor(
    private service: FinanceService
  ) {}

  // GET TRANSACTIONS
  @Get("transactions")
  getTransactions(
    @Req() req: any,
    @Query("search") search?: string
  ) {

    return this.service.getTransactions(
      req.user.tenantId,
      search || ""
    );
  }

  // CREATE TRANSACTION
  @Post("transactions")
  @Roles("ADMIN")
  createTransaction(
    @Body() body: any,
    @Req() req: any
  ) {

    return this.service.createTransaction(
      body,
      req.user.tenantId
    );
  }

  // DELETE TRANSACTION
  @Delete("transactions/:id")
  @Roles("ADMIN")
  deleteTransaction(
    @Param("id") id: string
  ) {

    return this.service.deleteTransaction(id);
  }

  // GET ACCOUNTS
  @Get("accounts")
  getAccounts(
    @Req() req: any
  ) {

    return this.service.getAccounts(
      req.user.tenantId
    );
  }

  // CREATE ACCOUNT
  @Post("accounts")
  @Roles("ADMIN")
  createAccount(
    @Body() body: any,
    @Req() req: any
  ) {

    return this.service.createAccount(
      body,
      req.user.tenantId
    );
  }
}