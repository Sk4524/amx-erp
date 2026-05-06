import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { FinanceService } from "./finance.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("finance")
export class FinanceController {
  constructor(private service: FinanceService) {}

  @Get("accounts")
  getAccounts(@Req() req: any) {
    return this.service.getAccounts(req.user.tenantId);
  }
}