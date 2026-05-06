import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("inventory")
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Get()
  getItems(@Req() req: any) {
    return this.service.getItems(req.user.tenantId);
  }
}