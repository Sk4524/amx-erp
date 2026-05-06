import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getItems(tenantId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { tenantId }
    });
  }
}